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
        const venta_producto = await VentaProducto.create(datos);
        console.log(venta_producto);
    } catch (e) {
        const error = new Error(e.name);
        console.log(error.message);
    }
}

//retornar todos los productos
const obtener_venta_productos = async  (req, res) => {
    const { id_venta } = req.params; //ID del proveedor
    const { limite } = req.query; //limite de resultados

    //buscar que ese venta exista
    const existeVenta = await Venta.findByPk(id_venta);

    //validar si existe venta
    if(!existeVenta) {
        const error = new Error("venta no existe");
        res.status(404).json({msg: error.message});
        return;
    }

    //consultar los productos en base al venta
    let consulta = await VentaProducto.findAll({
        where: {
          id_venta: id_venta
        },
        limit: limite 
    });
      
    //muestra error si no hay registros
    if(!consulta) {
        const error = new Error("no hay registros que mostrar");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}

//retorna un registro en especifico por ID
const obtener_venta_producto =  async (req, res) => {
    const { id_venta, id } = req.params; //ID del venta 

    //buscar que ese venta exista
    const existeVenta = await Venta.findByPk(id_venta);

    //validar si existe venta
    if(!existeVenta) {
        const error = new Error("venta no existe");
        res.status(404).json({msg: error.message});
    }

    //consultar los productos en base a la venta
    let consulta = await VentaProducto.findAll({
        where: {
          id_venta: id_venta,
          id: id
        }
    });
      
    //muestra error si no hay registros
    if(!consulta) {
        const error = new Error("no hay registros que mostrar");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}

//edita un producto en especifico
const editar_venta_producto = async  (req, res) => {
    const { id_venta:idVenta, id } = req.params;
    const { id_venta, id_producto, cantidad, subtotal } = req.body;//leer datos

    //buscamos que exista el registro venta al que pertenece
    const venta_url = await Venta.findByPk(idVenta); //al que pertenece

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
    if(!id_venta || !id_producto || !cantidad || !subtotal) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    //validamos que el formato sea valido
    if(!id_venta.match(regexEnteroPositivo)  || !id.match(regexEnteroPositivo) || !id_venta.match(regexEnteroPositivo) || !id_producto.match(regexEnteroPositivo) || !cantidad.match(regexEnteroPositivo) || !subtotal.match(regexEnteroPositivo)) {
        const error = new Error("todos los campos deben ser enteros positivos");
        res.status(400).json({ msg: error.message });
        return;
    }

    //buscamos producto
    const existeProducto = await Producto.findByPk(id_producto); //id que recibe desde req.body

    //validamos si no existe el producto
    if(!existeProducto) {
        const error = new Error("producto no encontrado");
        res.status(400).json({ msg: error.message });
        return;
    }

    //asignamos valores
    venta_producto.id_venta = id_venta || venta_producto.id_venta;
    venta_producto.id_producto = id_producto || venta_producto.id_producto;
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