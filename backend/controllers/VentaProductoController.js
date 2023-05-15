import VentaProducto from "../models/VentaProductoModel.js";
import Producto from "../models/ProductoModel.js";
import Venta from "../models/VentaModel.js";
import { regexEnteroPositivo } from "../helpers/utils.js";

//? Esta funcion no es para una ruta, se utiliza internamente en venta controller sin necesidad de una petición
const crear_venta_producto = async (datos) => {
    const { id_venta, id_producto, cantidad, subtotal } = datos;

    // Validar campos que no esten vacios
    if(!id_venta || !id_producto || !cantidad || !subtotal) {
        const error = new Error("Todos los campos son obligatorios (crear_venta_producto)");
        console.log(error.message);
        return;
    }

    // Validamos que el formato sea valido
    if(!id_venta > 0 || !id_producto > 0 || !cantidad > 0 || !subtotal > 0) {
        const error = new Error("Todos los campos deben ser enteros positivos");
        console.log(error.message);
        return;
    }

    // Buscamos producto
    const existeProducto = await Producto.findByPk(id_producto);

    // Validamos si no existe el producto
    if(!existeProducto) {
        const error = new Error("El registro debe contener un producto");
        console.log(error.message);
        return;
    }

    try {
        await VentaProducto.create(datos);
    } catch (e) {
        console.log({e});
        const error = new Error(e.name);
        console.log(error.message);
    }
}

/*
    Retorna todos los venta_productos
    Se puede poner un límite: ...?limite=1
    Se puede filtrar por id de la venta: ...?venta=1
    Se puede filtrar por id de producto: ...?producto=1
*/
const obtener_venta_productos = async  (req, res) => {
    const { limite, id, id_venta, id_producto, cantidad, subtotal } = req.query;

    const where = {};
    if(id) where.id = id;
    if(id_venta) where.id_venta = id_venta;
    if(id_producto) where.id_producto = id_producto;
    if(cantidad) where.cantidad = cantidad;
    if(subtotal) where.subtotal = subtotal;

    //consultar los productos en base al venta
    let consulta = await VentaProducto.findAll({ 
        where,
        limit: limite
    });
      
    //muestra error si no hay registros
    if(!consulta) {
        const error = new Error("No hay registros que mostrar");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}

// Edita un producto en especifico
const editar_venta_producto = async  (req, res) => {
    //! Falta mejorar
    const { id } = req.query;
    const { cantidad } = req.body;

    // Buscamos el registro venta_producto que contenga el ID
    const venta_producto = await VentaProducto.findByPk(id); //el que queremos editar

    // Validamos si no existe
    if(!venta_producto) {
        const error = new Error("Registro no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    if(cantidad) {
        if(!regexEnteroPositivo.test(cantidad)) {
            const error = new Error("Todos los campos deben ser enteros positivos");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //obtener venta para modificar su total
    const obtenerVenta = await Venta.findByPk(venta_producto.id_venta);
    obtenerVenta.total -= venta_producto.subtotal

    //obtener el producto para obtener su precio y modificar su subtotal
    const obtenerProducto = await Producto.findByPk(venta_producto.id_producto);
    venta_producto.subtotal = cantidad*obtenerProducto.precio;
    
    //asignamos valores
    venta_producto.cantidad = cantidad;

    //actualizar total venta
    obtenerVenta.total += venta_producto.subtotal;

    try {
        await obtenerVenta.save(); 
        await venta_producto.save(); //guardamos cambios
        res.json(venta_producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

// Elimina un producto en especifico
const eliminar_venta_producto = async (req, res) => {
    const { id, id_producto } = req.query;

    // Validar que id es un entero
    if(id) {
        if(id.match(regexEnteroPositivo)) {
            const error = new Error("El ID debe ser entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    // Validar que id_producto es un entero
    if(id_producto){
        if (!regexEnteroPositivo.test(id_producto)) {
            const error = new Error("El id_producto debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    const where = {};
    if(id) where.id = id;
    if(id_producto) where.id_producto = id_producto;

    const venta_producto = await VentaProducto.findAll({where});

    //validamos si no existe
    if(!venta_producto) {
        const error = new Error(`No existen registros venta_producto`);
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        // Se borran los elementos venta_producto
        let promesas = venta_producto.map(async vp => {
            //obtener la venta a la que pertenece para restarle el subtotal al total
            const venta = await Venta.findByPk(vp.id_venta);

            //restar subtotal al total
            venta.total -= vp.subtotal;

            await vp.destroy();
            
            if(venta.total <= 0) await venta.destroy();
            else await venta.save();
        })
        // Tenemos que usar promise all para que no se ejecute primero el res.json
        await Promise.all(promesas);

        res.json("Registros eliminados");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

export {
    crear_venta_producto,
    obtener_venta_productos,
    editar_venta_producto,
    eliminar_venta_producto,
}