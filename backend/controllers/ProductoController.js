import { regexCadena, regexEnteroPositivo, regexFlotantePositivo } from "../helpers/utils.js";
import Producto from "../models/ProductoModel.js";
import { Op } from "sequelize";
import fetch from 'node-fetch';

const crear_producto = async (req, res) => {
    const { id_proveedor, nombre, descripcion, precio_compra, precio_venta} = req.body; //leer input usuario
    
    if(!id_proveedor || !nombre || !descripcion || !precio_compra || !precio_venta) {
        const error = new Error("Todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!regexEnteroPositivo.test(id_proveedor)){
        const error = new Error("ID del proveedor invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!nombre.match(regexCadena)) {
        const error = new Error("Nombre de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!descripcion.match(regexCadena)) {
        const error = new Error("Descripción de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!regexFlotantePositivo.test(precio_compra)) {
        const error = new Error("Precio de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!regexFlotantePositivo.test(precio_venta)) {
        const error = new Error("Precio de producto invalido");
        res.status(400).json({msg: error.message});
        return;
    }

    try {
        const producto = await Producto.create({
            ...req.body,
            cantidad: 0
        });
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los productos
const obtener_productos = async  (req, res) => {
    const { limite, id, id_proveedor, nombre, descripcion, precio, cantidad } = req.query;

    if(id) {
        if(!regexEnteroPositivo.test(id)) {
            const error = new Error("El ID de Producto debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    if(id_proveedor) {
        if(!regexEnteroPositivo.test(id_proveedor)) {
            const error = new Error("El ID de Proveedor debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    if(limite) {
        if(!regexEnteroPositivo.test(limite)) {
            const error = new Error("El limite de Productos debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    if(cantidad) {
        if(!regexEnteroPositivo.test(cantidad)) {
            const error = new Error("La cantidad de Producto debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    if(precio) {
        if(!regexEnteroPositivo.test(precio) || !regexFlotantePositivo.test(precio)) {
            const error = new Error("La precio de Producto debe ser un entero positivo");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    const where = {};
    if(id) where.id = id;
    if(id_proveedor) where.id_proveedor = id_proveedor;
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
    const { id } = req.query;

    //validar formato nombre
    if(nombre) {
        if(!regexCadena.test(nombre)) {
            const error = new Error("Nombre de producto invalido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar formato descripcion
    if(descripcion) {
        if(!regexCadena.test(descripcion)) {
            const error = new Error("Descripcion de producto invalida");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar formato precio
    if(precio) {
        if(!regexFlotantePositivo.test(precio)) {
            const error = new Error("Precio de producto invalido");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar formato cantidad
    if(cantidad) {
        if(!regexEnteroPositivo.test(cantidad)) {
            const error = new Error("Cantidad de producto invalida");
            res.status(400).json({msg: error.message});
            return;
        }
    }

    //validar que el id no este vacio
    if (!id) {
        const error = new Error("El ID es obligatorio");
        res.status(400).json({msg: error.message});
    }
    
    //validar formato id
    if (!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID debe ser entero positivo");
        res.status(400).json({ msg: error.message });
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

    //validar que el id no este vacio
    if (!id) {
        const error = new Error("El ID es obligatorio");
        res.status(400).json({msg: error.message});
    }

    //validar formato id
    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID debe ser entero positivo");
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
        // Borrar en cascada los elementos que tengan referencias a este producto
        // CompraProducto y VentaProducto
        await fetch(`http://localhost:3000/api/compra-producto?id_producto=${id}`, {
            method: "DELETE"
        })
        // console.log("Productos de compras eliminadas");

        await fetch(`http://localhost:3000/api/venta-producto?id_producto=${id}`, {
            method: "DELETE"
        })
        // console.log("Productos de ventas eliminadas");

        await producto.destroy();
        res.json(producto);
    } catch (e) {
        console.log("error", {e});
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