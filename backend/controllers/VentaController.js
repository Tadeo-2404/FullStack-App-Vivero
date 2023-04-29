import Venta from "../models/VentaModel.js";
import { crear_venta_producto } from "./VentaProductoController.js";
import { regexFecha, regexEnteroPositivo, formatoFechaDB, regexFlotantePositivo } from "../helpers/utils.js";
import Producto from "../models/ProductoModel.js";
import VentaProducto from "../models/VentaProductoModel.js";

const crear_venta = async (req, res) => {
    const { venta, productos } = req.body;
    let total = 0
    // La fecha viene como DD-MM-YYYY, la cambiamos a un formato apto para la base de datos
    let fecha = formatoFechaDB(venta.fecha);

    // Validacion campos no vacios
    if(!fecha) {
        const error = new Error("Todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    // Validamos total
    if(!regexFlotantePositivo.test(total)) {
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
        let productosNoValidos = 0;
        productos.forEach(async producto => {
            const existe = await Producto.findOne({ where: { id: producto.id } });
            if (!existe) productosNoValidos++;
        })
    
        // Si todos los productos son validos, ejecutamos lo siguiente
        if (productosNoValidos === 0) {
            const venta = await Venta.create({ fecha, total }); //creamos la venta

            //iteramos sobre el arreglo de productos
            productos.forEach(async producto => {
                let subtotal = producto.precio * producto.cantidad;
                total = total + subtotal;

                //con cada producto creamos un registro de venta_producto
                await crear_venta_producto({
                    id_venta: venta.id,
                    id_producto: producto.id,
                    cantidad: producto.cantidad,
                    subtotal
                });
            });
            venta.total = total;
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
const obtener_ventas = async (req, res) => {
    const { limite, id, fecha, total } = req.query;

    const where = {};
    if(id) where.id = id;
    if(fecha) where.fecha = fecha;
    if(total) where.total = total;

    let consulta = await Venta.findAll({ 
      where,
      limit: limite
    });

    if(!consulta) {
        const error = new Error("no hay registros que mostrar");
        res.status(404).json({msg: error.message});
        return;
    }
    
    res.json(consulta)
}

//edita una venta en especifico
const editar_venta = async  (req, res) => {
    let { fecha } = req.body; //leer input usuario
    const { id } = req.query; //leer el id de la venta

    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID de Venta debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    //buscar venta
    const venta = await Venta.findByPk(id);

    //validar si venta no se encuentra
    if(!venta) {
        const error = new Error("venta no encontrada");
        res.status(404).json({msg: error.message});
        return;
    }

    if(fecha) {
        //asignamos valores
        venta.fecha = fecha;
    }

    try {
        await venta.save(); //guardar registro
        res.json(venta);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un venta en especifico
const eliminar_venta = async (req, res) => {
    const { id } = req.query; //leer el id del venta

    if(!regexEnteroPositivo.test(id)) {
        const error = new Error("El ID de Venta debe ser un entero positivo");
        res.status(400).json({msg: error.message});
        return;
    }

    const venta = await Venta.findByPk(id); //buscamos venta por id

    //validamos si la venta no se encuentra
    if(!venta) {
        const error = new Error("venta no encontrada");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        // Primero borramos todos los venta_producto que refieren a esta id
        let ventasProductos = await VentaProducto.findAll({ where: { id_venta: id } });
        ventasProductos.forEach(async ventaProducto => {
            await ventaProducto.destroy();
        })

        // Ahora sí borramos la venta
        await venta.destroy(); //destuimos el registro de venta

        res.json(venta);
    } catch (e) {
        console.log({e});
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_venta,
    obtener_ventas,
    editar_venta,
    eliminar_venta,
}