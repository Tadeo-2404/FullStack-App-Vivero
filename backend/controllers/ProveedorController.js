import { Op } from "sequelize"; //importamos OP para busqueda en obtener
import ProveedorProducto from "../models/ProveedorProductoModel.js";
import Proveedor from "../models/ProveedorModel.js"; //importar modelo Proveedor
import { regexNombreCompleto, regexTelefono, regexEnteroPositivo } from "../helpers/utils.js"; //importar regex para validacion de formato

//crear un proveedor
const crear_proveedor = async (req, res) => {
    const { nombre, telefono } = req.body; //leer input usuario

    //validamos los campos no vacios
    if(!nombre || !telefono) {
        const error = new Error("todos los campos son obligatorios");
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

    try {
        //crear objeto proveedor
        const proveedor = await Proveedor.create(req.body);
        res.json(proveedor);
    } catch (e) {
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
    const { nombre, telefono } = req.body; //leer input usuario
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

    //asignamos valores
    proveedor.nombre = nombre || proveedor.nombre;
    proveedor.telefono = telefono || proveedor.telefono;

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
    const { id } = req.params; //leer el id del proveedor

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
        const error = new Error("proveedor no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        // Primero borramos todos los proveedor_producto que refieren a esta id
        let proveedorProductos = await ProveedorProducto.findAll({ where: { proveedor_id: id } });
        proveedorProductos.forEach(async proveedorProducto => {
            await proveedorProducto.destroy();
        })

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