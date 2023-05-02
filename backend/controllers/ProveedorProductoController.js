import { Op } from "sequelize";
import ProveedorProducto from "../models/ProveedorProductoModel.js";
import Proveedor from "../models/ProveedorModel.js";
import { regexEnteroPositivo, regexFlotantePositivo, regexNombreCompleto } from "../helpers/utils.js";

//crear un registro
const crear_proveedor_producto = async (datos) => {
    const { proveedor_id, nombre, descripcion, precio, cantidad } = datos;

    // Validar campos que no esten vacios
    if(!proveedor_id  || !nombre || !descripcion || !precio || !cantidad) {
        const error = new Error("Todos los campos son obligatorios");
        console.log(error.message);
        return;
    }

    //validamos que el formato sea valido
    if(!regexEnteroPositivo.test(proveedor_id)  || !regexEnteroPositivo.test(precio) || !regexEnteroPositivo.test(cantidad)) {
        const error = new Error("todos los campos deben ser enteros positivos");
        res.status(400).json({ msg: error.message });
        return;
    }

    if(!nombre.length > 0 || !descripcion.length > 0) {
        const error = new Error("Todos los campos deben contener caracteres");
        console.log(error.message);
        return;
    }

    // Buscamos proveedor
    const existeProveedor = await Proveedor.findByPk(proveedor_id);

    // Validamos si no existe el proveedor
    if(!existeProveedor) {
        const error = new Error("El registro debe contener un proveedor");
        console.log(error.message);
        return;
    }

    try {
        const proveedor_producto = await ProveedorProducto.create(datos);
        console.log(proveedor_producto);
    } catch (e) {
        console.log(e);
        const error = new Error(e.name);
        console.log(error.message);
    }
}

//retornar todos los registros
const obtener_proveedor_productos = async  (req, res) => {
    const { limite, id, proveedor_id, nombre, descripcion, precio, cantidad} = req.query; //limite de resultados

    //validar que ID es un entero
    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }
    
    //validar que Proveedor ID es un entero
    if(!regexEnteroPositivo.test(proveedor_id)) {
        const error = new Error("El Proveedor ID debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //validar que limite es un entero
    if(!regexEnteroPositivo.test(limite)) {
        const error = new Error("El limite debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    const where = {};
    if(id) where.id = producto_id;
    if(proveedor_id) where.proveedor_id = proveedor_id;
    if(nombre) where.nombre = { [Op.like]: `%${nombre}%` };
    if(descripcion) where.descripcion = { [Op.like]: `%${descripcion}%` };
    if(precio) where.precio = precio;
    if(cantidad) where.cantidad = precio;

    //consultar los productos en base al proveedor
    let consulta = await ProveedorProducto.findAll({
        where,
        limit: limite 
    });
      
    //muestra error si no hay registros
    if(!consulta) {
        const error = new Error("no hay productos que mostrar");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}


//edita un producto en especifico
const editar_proveedor_producto = async  (req, res) => {
    const { id } = req.query; //ID del proveedor 
    const { proveedor_id, nombre, descripcion, precio, cantidad } = req.body; //recibir datos 

    //validar ID no este vacio
    if(!id) {
        const error = new Error("El ID es obligatorio");
        res.status(400).json({msg: error.message});
        return;
    }
    
    //validar que ID es un entero
    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //consultar los productos en base al proveedor
    const existeProducto = await ProveedorProducto.findOne({
        where: {
          id: id
        }
    });
      
    //muestra error si no hay registros
    if(!existeProducto) {
        const error = new Error("este producto no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    //validar que Proveedor ID es un entero
    if (proveedor_id) {
        if (!regexEnteroPositivo.test(proveedor_id)) {
            const error = new Error("El Proveedor ID debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //si el nombre se edita, validamos su formato
    if(nombre) {
        if(regexNombreCompleto.test(nombre)) {
            const error = new Error("El formato del nombre no es valido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //si la descripcion se edita, validamos su formato
    if(descripcion) {
        if(descripcion.length > 0) {
            const error = new Error("La descripcion debe contener caracteres");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //si el precio se edita, validamos su formato
    if(precio) {
        if(!regexFlotantePositivo.test(precio)) {
            const error = new Error("El formato del precio no es valido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //si la cantidad se edita, validamos su formato
    if(cantidad) {
        if(!regexEnteroPositivo.test(cantidad)) {
            const error = new Error("El formato de cantidad no es valido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //buscar el nuevo ID del Proveedor 
    const obtenerNuevoProveedor = await Proveedor.findByPk(proveedor_id);

    //si el Proveedor no existe 
    if(!obtenerNuevoProveedor) {
        const error = new Error(`El Proveedor con el ID ${proveedor_id} no existe`);
        res.status(404).json({msg: error.message});
        return;
    }

    //asignamos valores
    existeProducto.proveedor_id ||= proveedor_id;
    existeProducto.nombre ||= nombre;
    existeProducto.precio ||= precio;
    existeProducto.cantidad ||= cantidad;

    try {
        await existeProducto.save(); //guardamos cambios
        res.json(existeProducto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un producto en especifico
const eliminar_proveedor_producto = async (req, res) => {
    const { id_proveedor, id } = req.params; //parametros url 

    //buscar que ese proveedor exista
    const existeProveedor = await Proveedor.findByPk(id_proveedor);

    //validar si existe proveedor
    if(!existeProveedor) {
        const error = new Error("este proveedor no existe");
        res.status(404).json({msg: error.message});
    }

    //consultar los productos en base al proveedor
    let proveedor_producto = await ProveedorProducto.findOne({
        where: {
          id_proveedor: id_proveedor,
          id: id
        }
    });
      
    //muestra error si no hay registros
    if(!proveedor_producto) {
        const error = new Error("este producto no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await proveedor_producto.destroy(); //eliminamos el registro
        res.json("registro eliminado");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

export {
    crear_proveedor_producto,
    obtener_proveedor_productos,
    editar_proveedor_producto,
    eliminar_proveedor_producto,
}