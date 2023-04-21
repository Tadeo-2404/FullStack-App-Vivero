import Venta from "../models/VentaModel.js";
import { crear_venta_producto } from "./VentaProductoController.js";

const crear_venta = async (req, res) => {
    const { venta, productos } = req.body; //leer objetos
    const { total, fecha } = venta;
    //fecha: DD-MM-YY
    const regexFecha = /^([0-9]{2})-([0-9]{2})-([0-9]{2})$/; //regex para validar formato de fecha
    const regexEnteroPositivo = /^[1-9][0-9]*$/; //regex para validar enteros positivos

    //validacion campos no vacios
    if(!total || !fecha) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    //validamos total
    if(!total.match(regexEnteroPositivo)) {
        const error = new Error("formato de total invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validamos formato de fecha
    if(!fecha.match(regexFecha)) {
        const error = new Error("formato de fecha invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    try {
        const venta = new Venta(req.body); //creamos la venta

        /*por cada producto del arreglo de productos creamos un objeto de venta_producto
        pasando como valores el ID de la venta al que pertenece y demas informacion*/
        for (const producto of productos) { 
            const subtotal = producto.precio*producto.cantidad; //calcular subtotal de ese producto
            await crear_venta_producto({
                venta_id: venta.id, //id venta
                producto_id: producto.id, //id del producto
                cantidad: producto.cantidad, //cantidad de producto
                subtotal: subtotal //subtotal de ese producto
            });
        }

        await venta.save(); //finalmente guardamos la venta
        res.json(venta);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los ventas
const obtener_ventas = async  (req, res) => {
    const { limite } = req.query;
    let consulta = await Venta.findAll({ limit: limite }); // Realiza la consulta

    //muestra error si no hay ventas
    if(!consulta) {
        const error = new Error("no hay ventas");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna venta
}

//retorna una venta en especifico por ID
const obtener_venta =  async (req, res) => {
    const { id } = req.params; //leer el id del venta
    const consulta = await Venta.findByPk(id); //realiza la consulta

    //si el venta no se encuentra
    if(!consulta) {
        const error = new Error("venta no encontrada");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna venta
}

//edita una venta en especifico
const editar_venta = async  (req, res) => {
    const { fecha, total } = req.body; //leer input usuario
    const { id } = req.params; //leer el id de la venta
    const regexFecha = /^([0-9]{2})-([0-9]{2})-([0-9]{2})$/; //regex para validar formato de fecha
    const regexEnteroPositivo = /^[1-9][0-9]*$/; //regex para validar enteros positivos
    const venta = await Venta.findByPk(id);

    //validar si la venta no se encuentra
    if(!venta) {
        const error = new Error("venta no encontrada");
        res.status(404).json({msg: error.message});
        return;
    }

    //validamos formato de fecha
    if(!fecha.match(regexFecha)) {
        const error = new Error("formato de fecha invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validamos total
    if(!total.match(regexEnteroPositivo)) {
        const error = new Error("formato de total invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //asignamos valores
    venta.fecha = fecha || venta.fecha;
    venta.total = total || venta.total;

    try {
        await venta.save();
        res.json(venta);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un venta en especifico
const eliminar_venta = async (req, res) => {
    const { id } = req.params; //leer el id del venta
    const venta = await Venta.findByPk(id); //buscamos venta por id

    //validamos si la venta no se encuentra
    if(!venta) {
        const error = new Error("venta no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await venta.destroy(); //destuimos el registro de venta
        res.json("venta eliminada");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_venta,
    obtener_ventas,
    obtener_venta,
    editar_venta,
    eliminar_venta,
}