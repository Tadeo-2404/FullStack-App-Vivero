import { regexCadena, regexEnteroPositivo, regexFlotantePositivo } from "../helpers/utils.js";
import Producto from "../models/ProductoModel.js";
import { Op } from "sequelize";

const crear_producto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad} = req.body; //leer input usuario
    
    if(!nombre || !descripcion || !precio || !cantidad) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!nombre.match(regexCadena)) {
        const error = new Error("nombre de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!descripcion.match(regexCadena)) {
        const error = new Error("descripcion de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!regexFlotantePositivo.test(precio)) {
        const error = new Error("precio de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!regexEnteroPositivo.test(cantidad)) {
        const error = new Error("cantidad de producto invalida");
        res.status(400).json({msg: error.message});
        return;
    }

    try {
        const producto = await Producto.create(req.body);
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los productos
const obtener_productos = async  (req, res) => {
    const { limite, id, nombre, descripcion, precio, cantidad } = req.query;

    const where = {};
    if(id) where.id = id;
    if(nombre) where.nombre = { [Op.like]: `%${nombre}%` };
    if(descripcion) where.descripcion = { [Op.like]: `%${descripcion}%` };
    if(precio) where.precio = precio;
    if(cantidad) where.cantidad = cantidad;

    let consulta = await Producto.findAll({ 
      where,
      limit: limite
    });
    
    res.json(consulta)
}

//edita un producto en especifico
const editar_producto = async  (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body; //leer input usuario

    //validar formato nombre
    if(nombre) {
        if(!regexCadena.test(nombre)) {
            const error = new Error("nombre de producto invalido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar formato descripcion
    if(descripcion) {
        if(!regexCadena.test(descripcion)) {
            const error = new Error("descripcion de producto invalida");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar formato precio
    if(precio) {
        if(!regexFlotantePositivo.test(precio)) {
            const error = new Error("precio de producto invalido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar formato cantidad
    if(cantidad) {
        if(!regexEnteroPositivo.test(cantidad)) {
            const error = new Error("cantidad de producto invalida");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    const { id } = req.query; //leer el id

    //validar formato id
    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("id debe ser entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //buscar producto
    const producto = await Producto.findByPk(id);

    //validar si producto no se encuentra
    if(!producto) {
        const error = new Error("Producto no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    //asignamos valores
    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.cantidad = cantidad || producto.cantidad;

    try {
        await producto.save(); //guardar registro
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un producto en especifico
const eliminar_producto = async (req, res) => {
    const { id } = req.query; //leer el id del producto

    //validar formato id
    if(!id.match(regexEnteroPositivo)) {
        const error = new Error("id debe ser entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //buscar producto
    const producto = await Producto.findByPk(id);

    //validar si producto no fue encontrado
    if(!producto) {
        const error = new Error("Producto no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await producto.destroy(); //eliminar registro
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

export {
    crear_producto,
    obtener_productos,
    editar_producto,
    eliminar_producto,
}