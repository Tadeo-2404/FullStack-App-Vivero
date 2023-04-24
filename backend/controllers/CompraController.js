import Compra from "../models/CompraModel.js";
import Proveedor from "../models/ProveedorModel.js";
import { regexFecha, regexEnteroPositivo, formatoFechaDB } from "../helpers/utils.js";
import ProveedorProducto from "../models/ProveedorProductoModel.js";
import { crear_proveedor_producto } from "./ProveedorProductoController.js";

// Crear una compra
const crear_compra = async (req, res) => { 
    const { compra, proveedor_id, productos_proveedor } = req.body;

    let total = 0;
    let fecha = formatoFechaDB(compra.fecha);

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

    // Buscar el proveedor
    const existeProveedor = await Proveedor.findOne({where: {id: proveedor_id}});

    // Verificar que existe proveedor
    if(!existeProveedor) {
        const error = new Error("proveedor no existe");
        res.status(404).json({msg: error.message});
    }

    try {        
        // Verificar si cada provedor_producto existe en la base de datos
        const productosNoValidos = 0;
        productos_proveedor.forEach(async producto => {
            const existe = await ProveedorProducto.findOne({ where: { id: producto.id } });
            if (!existe) productosNoValidos++;
        })
    
        // Si todos los proveedor_productos son validos, ejecutamos lo siguiente
        if (productosNoValidos === 0) {
            const compra = await Compra.create({ proveedor_id, fecha, total }); //creamos la compra

            // Iteramos sobre el arreglo de productos_proveedor
            productos_proveedor.forEach(async producto => {
                // Con cada proveedor_producto creamos un registro de proveedor_producto
                total += producto.precio //al total a pagar le sumamos el precio de cada producto
                await crear_proveedor_producto({
                    proveedor_id: proveedor_id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                });
            });
            compra.total = total;
            await compra.save();
            res.status(200).json(venta);
        } else {
            res.status(400).json({msg: 'Existen productos no validos'});
        }
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }    
}

// Retornar todas las ventas
const obtener_compras = async  (req, res) => {
    const { limite } = req.query;
    let consulta = await Compra.findAll({ limit: limite }); // Realiza la consulta

    // Muestra error si no hay compras
    if(!consulta) {
        const error = new Error("no hay compras");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna compra
}

//retorna una compra en especifico por ID
const obtener_compra =  async (req, res) => {
    const { id } = req.params; //leer el id de la compra
    const consulta = await Compra.findByPk(id); //realiza la consulta

    //si la compra no se encuentra
    if(!consulta) {
        const error = new Error("compra no encontrada");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna compra
}

//edita una compra en especifico
const editar_compra = async  (req, res) => {
}

//elimina una compra en especifico
const eliminar_compra = async (req, res) => {
    const { id } = req.params; //leer el id de la compra
    const compra = await Compra.findByPk(id); //buscamos compra por id

    //validamos si la compra no se encuentra
    if(!compra) {
        const error = new Error("compra no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await compra.destroy(); //destuimos el registro de compra
        res.json("compra eliminada");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_compra,
    obtener_compras,
    obtener_compra,
    editar_compra,
    eliminar_compra,
}