import { Op } from "sequelize"; //importamos OP para busqueda en obtener
import Proveedor from "../models/ProveedorModel.js"; //importar modelo Proveedor
import { regexNombreCompleto, regexTelefono, regexEnteroPositivo, regexCP, regexRFC, regexNumeroCasa } from "../helpers/utils.js"; //importar regex para validacion de formato
import Producto from "../models/ProductoModel.js";
import fetch from "node-fetch";

//crear un proveedor
const crear_proveedor = async (req, res) => {
    const { nombre, telefono, rfc, calle, numero, colonia, cp } = req.body; //leer input usuario

    //validamos los campos no vacios
    if(!nombre || !telefono) {
        const error = new Error("Todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    //validar formato nombre
    if(!nombre.match(regexNombreCompleto)) {
        const error = new Error("El nombre del Proveedor solo debe contener caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato telefono
    if(!regexTelefono.test(telefono)) {
        const error = new Error("El telefono del Proveedor debe contener 10 digitos y solo numeros 0-9");
        res.status(400).json({ msg: error.message });
        return;
    }

    if(rfc && !regexRFC.test(rfc)) {
        const error = new Error("El RFC no es válido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato calle
    if(!regexNombreCompleto.test(calle)) {
        const error = new Error("La calle del Proveedor debe contener solo caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato numero
    if(!regexNumeroCasa.test(numero)) {
        const error = new Error("El numero del Proveedor no tiene un formato nuevo");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato colonia
    if(!regexNombreCompleto.test(colonia)) {
        const error = new Error("La colonia del Proveedor debe contener solo caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato CP
    if(!regexCP.test(cp)) {
        const error = new Error("El CP no tiene un formato valido");
        res.status(400).json({ msg: error.message });
        return;
    }

    try {
        let direccion = `${calle} #${numero}, ${colonia}, ${cp} `;
        //crear objeto proveedor
        const proveedor = await Proveedor.create({
            nombre,
            telefono,
            rfc,
            direccion
        });
        res.json(proveedor);
    } catch (e) {
        console.log({e});
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los proveedores
const obtener_proveedores = async  (req, res) => {
    const { limite, id, nombre, telefono } = req.query; //leer filtros de busqueda

    //validar que ID es un entero
    if(id) {
        if(!regexEnteroPositivo.test(id)) {
            const error = new Error("El ID debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar que ID es un entero
    if(limite) {
        if(!regexEnteroPositivo.test(limite)) {
            const error = new Error("El Limite debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    const where = {};
    if(id) where.id = id;
    if(nombre) where.nombre = { [Op.like]: `%${nombre}%` };
    if(telefono) where.telefono = { [Op.like]: `%${telefono}%` };

    //realizar consulta
    let consulta = await Proveedor.findAll({ 
      where,
      limit: limite
    });
    
    res.json(consulta)
}

//edita un proveedor en especifico
const editar_proveedor = async  (req, res) => {
    const { nombre, telefono, rfc, calle, numero, colonia, cp } = req.body; //leer input usuario
    const { id } = req.query; //leer el id del proveedor

    //validar que ID es un entero
    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID de Proveedor debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //buscar proveedor por DI
    const proveedor = await Proveedor.findByPk(id);

    //validacion si el proveedor no se encuenta
    if(!proveedor) {
        const error = new Error(`El Proveedor con el ID ${id} no encontrado`);
        res.status(404).json({msg: error.message});
        return;
    }

    //si se edita el nombre, se valida su formato
    if(nombre) {
        if(!nombre.match(regexNombreCompleto)) {
            const error = new Error("El nombre del Proveedor solo debe contener caracteres");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //si se edita el telefono, se valida su formato
    if(telefono) {
        if(!telefono.match(regexTelefono)) {
            const error = new Error("El telefono del Proveedor debe contener 10 digitos y solo numeros 0-9");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    // Se verifican el rfc y la dirección
    if(rfc && !regexRFC.test(rfc)) {
        const error = new Error("El RFC no es válido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato calle
    if(calle && !regexNombreCompleto.test(calle)) {
        const error = new Error("La calle del Proveedor debe contener solo caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato numero
    if(numero && !regexNumeroCasa.test(numero)) {
        const error = new Error("El numero del Proveedor no tiene un formato nuevo");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato colonia
    if(colonia && !regexNombreCompleto.test(colonia)) {
        const error = new Error("La colonia del Proveedor debe contener solo caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validar formato CP
    if(cp && !regexCP.test(cp)) {
        const error = new Error("El CP no tiene un formato valido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //asignamos valores
    proveedor.nombre ||= nombre;
    proveedor.telefono ||=telefono;
    proveedor.rfc ||= rfc;
    proveedor.direccion ||= `${calle} #${numero}, ${colonia}, ${cp} `;

    try {
        await proveedor.save(); //guardamos el proveedor
        res.json(proveedor);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un proveedor en especifico
const eliminar_proveedor = async (req, res) => {
    const { id } = req.query; //leer el id del proveedor

    //validar que ID es un entero
    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID de Proveedor debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //buscar proveedor por ID
    const proveedor = await Proveedor.findByPk(id);

    //arrojamos error si no se encuentra el proveedor
    if(!proveedor) {
        const error = new Error("Proveedor no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        // Borrar todos los productos relacionados con el proveedor
        let productos = await Producto.findAll({ where: {
            id_proveedor: id
        } })

        // Por cada producto borramos en cascada con una petición a borrar un producto (al borrar el producto ya está programado que borre sus compra-producto y venta-producto)
        let promesas = productos.map(async producto => {
            await fetch(`http://localhost:3000/api/productos?id=${producto.id}`, {
                method: "DELETE"
            });
        })
        // Tenemos que usar promise all para que no se ejecute primero el destroy
        await Promise.all(promesas);

        // Ahora sí borramos el proveedor
        await proveedor.destroy(); //destuimos el registro de proveedor
        res.json(proveedor);
    } catch (e) {
        console.log({e});
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_proveedor,
    obtener_proveedores,
    editar_proveedor,
    eliminar_proveedor,
}