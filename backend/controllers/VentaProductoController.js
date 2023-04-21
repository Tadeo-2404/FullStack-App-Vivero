import VentaProducto from "../models/VentaProductoModel.js";
import Producto from "../models/ProductoModel.js";
import Venta from "../models/VentaModel.js";
import { regexEnteroPositivo } from "../utils.js";

//? Esta funcion no es para una ruta, se utiliza internamente en venta controller sin necesidad de una petición
const crear_venta_producto = async (datos) => {
    const { venta_id, producto_id, cantidad, subtotal } = datos;

    // Validar campos que no esten vacios
    if(!venta_id || !producto_id || !cantidad || !subtotal) {
        const error = new Error("Todos los campos son obligatorios (crear_venta_producto)");
        console.log(error.message);
        return;
    }

    // Validamos que el formato sea valido
    if(!venta_id > 0 || !producto_id > 0 || !cantidad > 0 || !subtotal > 0) {
        const error = new Error("Todos los campos deben ser enteros positivos");
        console.log(error.message);
        return;
    }

    // Buscamos producto
    const existeProducto = await Producto.findByPk(producto_id);

    // Validamos si no existe el producto
    if(!existeProducto) {
        const error = new Error("El registro debe contener un producto");
        console.log(error.message);
        return;
    }

    try {
        const venta_producto = await VentaProducto.create(datos);
    } catch (e) {
        console.log(e);
        const error = new Error(e.name);
        console.log(error.message);
    }
}

//retornar todos los productos
const obtener_venta_productos = async  (req, res) => {
    const { limite } = req.query; //limite de resultados
    let consulta = await VentaProducto.findAll({ limit: limite }); // Realiza la consulta

    //muestra error si no hay registros
    if(!consulta) {
        const error = new Error("no hay productos que mostrar");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}

//retorna un registro en especifico por ID
const obtener_venta_producto =  async (req, res) => {
    const { id } = req.params; //leer el id del producto
    const consulta = await VentaProducto.findByPk(id); //realiza la consulta

    //si el producto no se encuentra
    if(!consulta) {
        const error = new Error("registro no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna producto
}

//edita un producto en especifico
const editar_venta_producto = async  (req, res) => {
    const { id_venta, id } = req.params;
    const { venta_id, producto_id, cantidad, subtotal } = req.body;//leer datos

    //buscamos que exista el registro venta al que pertenece
    const venta_url = await Venta.findByPk(id_venta); //al que pertenece

    //validamos si no existe
    if(!venta_url) {
        const error = new Error("esta venta no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    //buscamos el registro venta_producto que contenga el mismo ID y el ID de venta
    const venta_producto = await VentaProducto.findOne({where: {id: id, id_venta: id_venta}}); //el que queremos editar

    //validamos si no existe
    if(!venta_producto) {
        const error = new Error("registro no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    //validar campos que no esten vacios
    if(!venta_id || !producto_id || !cantidad || !subtotal) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    //validamos que el formato sea valido
    if(!id_venta.match(regexEnteroPositivo)  || !id.match(regexEnteroPositivo) || !venta_id.match(regexEnteroPositivo) || !producto_id.match(regexEnteroPositivo) || !cantidad.match(regexEnteroPositivo) || !subtotal.match(regexEnteroPositivo)) {
        const error = new Error("todos los campos deben ser enteros positivos");
        res.status(400).json({ msg: error.message });
        return;
    }

    //buscamos producto
    const existeProducto = await Producto.findByPk(producto_id); //id que recibe desde req.body

    //validamos si no existe el producto
    if(!existeProducto) {
        const error = new Error("producto no encontrado");
        res.status(400).json({ msg: error.message });
        return;
    }

    //asignamos valores
    venta_producto.venta_id = venta_id || venta_producto.venta_id;
    venta_producto.producto_id = producto_id || venta_producto.producto_id;
    venta_producto.cantidad = cantidad || venta_producto.cantidad;
    venta_producto.subtotal = subtotal || venta_producto.subtotal;

    try {
        await venta_producto.save(); //guardamos cambios
        res.json(venta_producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un producto en especifico
const eliminar_venta_producto = async (req, res) => {
    const { id_venta, id } = req.params; //leer el id del producto

    //validamos que el formato sea valido
    if(!id_venta.match(regexEnteroPositivo), !id.match(regexEnteroPositivo)) {
        const error = new Error("los ID deben ser enteros positivos");
        res.status(400).json({ msg: error.message });
        return;
    }

    //buscamos el registro venta
    const venta = await Venta.findByPk(id_venta);

    //validamos si no existe
    if(!venta) {
        const error = new Error("esta venta no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    //buscamos el registro venta_producto que contenga el mismo ID y el ID de venta
    const venta_producto = await VentaProducto.findOne({where: {id: id, id_venta: id_venta}});

    //validamos si no existe
    if(!venta_producto) {
        const error = new Error("registro no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await venta_producto.destroy(); //eliminamos el registro
        res.json("registro eliminado");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_venta_producto,
    obtener_venta_productos,
    obtener_venta_producto,
    editar_venta_producto,
    eliminar_venta_producto,
}