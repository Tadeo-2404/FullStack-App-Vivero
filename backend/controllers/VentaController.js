import Venta from "../models/VentaModel.js";
import { crear_venta_producto } from "./VentaProductoController.js";
import { regexEnteroPositivo } from "../helpers/utils.js";
import Producto from "../models/ProductoModel.js";
import VentaProducto from "../models/VentaProductoModel.js";

const crear_venta = async (req, res) => {
    const { productos } = req.body;

    try {        
        // Verificar si cada producto existe en la base de datos
        let productosNoValidos = 0;
        productos.forEach(async producto => {
            const existe = await Producto.findOne({ where: { id: producto.id } });
            if (!existe) productosNoValidos++;
        })
    
        // Si todos los productos son validos, ejecutamos lo siguiente
        if (productosNoValidos === 0) {
            const venta = await Venta.create({ total: 0 }); //creamos la venta

            // Ver si hay algún producto que no tenga cantidad suficiente
            let cantidadSuficiente = true;
            for(let producto of productos){
                let prod = await Producto.findByPk(producto.id);
                if(prod.cantidad < producto.cantidad){
                    cantidadSuficiente = false;
                    break;
                }
            }
            if(!cantidadSuficiente){
                res.status(400).json({msg: "No hay cantidad suficiente de algún Producto"});
                return;
            }

            //iteramos sobre el arreglo de productos
            productos.forEach(async producto => {
                let subtotal = producto.precio_venta * producto.cantidad;

                //con cada producto creamos un registro de venta_producto
                //? Con el trigger, al crear una venta_producto, el total se recalcula
                let respuesta = await crear_venta_producto({
                    id_venta: venta.id,
                    id_producto: producto.id,
                    cantidad: producto.cantidad,
                    subtotal
                });
                // console.log({respuesta});

                // Restamos la cantidad al Producto
                let prod = await Producto.findByPk(producto.id);
                // Si no alcanza el stock, lanza un error
                prod.cantidad -= producto.cantidad;
                await prod.save();
            });
            res.status(200).json(venta);
        } else {
            res.status(400).json({msg: 'Existen productos no validos'});
        }
    } catch (e) {
        console.log({e});
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
        const error = new Error("No hay registros que mostrar");
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
        const error = new Error("Venta no encontrada");
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
        const error = new Error("Venta no encontrada");
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