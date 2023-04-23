import Venta from "../models/VentaModel.js";
import { crear_venta_producto } from "./VentaProductoController.js";
import { regexFecha, regexEnteroPositivo, formatoFechaDB } from "../helpers/utils.js";
import Producto from "../models/ProductoModel.js";

const crear_venta = async (req, res) => {
    const { venta, productos } = req.body;
    let total = venta.total?.toString() || 0;
    // La fecha viene como DD-MM-YYYY, la cambiamos a un formato apto para la base de datos
    let fecha = formatoFechaDB(venta.fecha);

    // Validacion campos no vacios
    if(!total || !fecha) {
        const error = new Error("Todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    // Validamos total
    if(!total.match(regexEnteroPositivo)) {
        const error = new Error("Formato de total invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    // Validamos formato de fecha
    if(!fecha.match(regexFecha)) {
        const error = new Error("Formato de fecha invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    try {        
        // Verificar si cada producto existe en la base de datos
        const productosNoValidos = await productos.map(async producto => {
            const existe = await Producto.findOne({ where: { id: producto.id } });
            if (!existe) {
                return producto;
            }
        });
    
        // Si todos los productos son validos, ejecutamos lo siguiente
        if (productosNoValidos === 0) {
            const venta = await Venta.create({ fecha, total }); //creamos la venta

            //iteramos sobre el arreglo de productos
            productos.forEach(async producto => {

                //con cada producto creamos un registro de venta_producto
                await crear_venta_producto({
                    venta_id: venta.id,
                    producto_id: producto.id,
                    cantidad: producto.cantidad,
                    subtotal: producto.precio * producto.cantidad
                });
            });
            await venta.save(); //guardamos la venta
            res.status(200).json(venta);
        } else {
            res.status(400).json({msg: 'Existen productos no validos'});
        }
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }    
}

// Retornar todos los ventas
const obtener_ventas = async  (req, res) => {
    const { limite } = req.query;
    let consulta = await Venta.findAll({ limit: limite }); // Realiza la consulta

    // Muestra error si no hay ventas
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