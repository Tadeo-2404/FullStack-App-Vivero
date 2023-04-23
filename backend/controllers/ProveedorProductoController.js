import ProveedorProducto from "../models/ProveedorProductoModel.js";
import { regexEnteroPositivo } from "../helpers/utils.js";
import Proveedor from "../models/ProveedorModel.js";

//crear un registro
const crear_proveedor_producto = async (req, res) => {
    const { proveedor_id, nombre, descripcion, precio, cantidad } = req.body; //recibir datos 

    // Validar campos que no esten vacios
    if(!proveedor_id  || !nombre || !descripcion || !precio || !cantidad) {
        const error = new Error("Todos los campos son obligatorios");
        console.log(error.message);
        return;
    }

    //validamos que el formato sea valido
    if(!proveedor_id.match(regexEnteroPositivo)  || !precio.match(regexEnteroPositivo) || !cantidad.match(regexEnteroPositivo)) {
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
        const proveedor_producto = await ProveedorProducto.create(req.body); //crear registro proveedor_producto
        proveedor_producto.save(); //guardar registro
    } catch (e) {
        console.log(e);
        const error = new Error(e.name);
        console.log(error.message);
    }
}

//retornar todos los registros
const obtener_proveedor_productos = async  (req, res) => {
    const { id_proveedor } = req.params; //ID del proveedor 
    const { limite } = req.query; //limite de resultados

    //buscar que ese proveedor exista
    const existeProveedor = await Proveedor.findByPk(id_proveedor);

    //validar si existe proveedor
    if(!existeProveedor) {
        const error = new Error("proveedor no existe");
        res.status(404).json({msg: error.message});
    }

    //consultar los productos en base al proveedor
    let consulta = await ProveedorProducto.findAll({
        where: {
          id_proveedor: id_proveedor
        },
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

//retorna un registro en especifico por ID
const obtener_proveedor_producto =  async (req, res) => {
    const { id_proveedor, id } = req.params; //ID del proveedor 

    //buscar que ese proveedor exista
    const existeProveedor = await Proveedor.findByPk(id_proveedor);

    //validar si existe proveedor
    if(!existeProveedor) {
        const error = new Error("este proveedor no existe");
        res.status(404).json({msg: error.message});
    }

    //consultar los productos en base al proveedor
    let consulta = await ProveedorProducto.findOne({
        where: {
          id_proveedor: id_proveedor,
          id: id
        }
    });
      
    //muestra error si no hay registros
    if(!consulta) {
        const error = new Error("este producto no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}

//edita un producto en especifico
const editar_proveedor_producto = async  (req, res) => {
    const { id_proveedor, id } = req.params; //ID del proveedor 
    const { proveedor_id, nombre, descripcion, precio, cantidad } = req.body; //recibir datos 
    
    //buscar que ese proveedor exista
    const existeProveedor = await Proveedor.findByPk(id_proveedor);

    //validar si existe proveedor
    if(!existeProveedor) {
        const error = new Error("este proveedor no existe");
        res.status(404).json({msg: error.message});
    }

    //consultar los productos en base al proveedor
    const existeProducto = await ProveedorProducto.findOne({
        where: {
          id_proveedor: id_proveedor,
          id: id
        }
    });
      
    //muestra error si no hay registros
    if(!existeProducto) {
        const error = new Error("este producto no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    // Validar campos que no esten vacios
    if(!proveedor_id  || !nombre || !descripcion || !precio || !cantidad) {
        const error = new Error("Todos los campos son obligatorios");
        console.log(error.message);
        return;
    }

    //validamos que el formato sea valido
    if(!proveedor_id.match(regexEnteroPositivo)  || !precio.match(regexEnteroPositivo) || !cantidad.match(regexEnteroPositivo)) {
        const error = new Error("todos los campos deben ser enteros positivos");
        res.status(400).json({ msg: error.message });
        return;
    }

    if(!nombre.length > 0 || !descripcion.length > 0) {
        const error = new Error("Todos los campos deben contener caracteres");
        console.log(error.message);
        return;
    }

    //asignamos valores
    existeProducto.proveedor_id = proveedor_id || existeProducto.proveedor_id;
    existeProducto.nombre = nombre || existeProducto.nombre;
    existeProducto.precio = precio || existeProducto.precio;
    existeProducto.cantidad = cantidad || existeProducto.cantidad;

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
    obtener_proveedor_producto,
    editar_proveedor_producto,
    eliminar_proveedor_producto,
}