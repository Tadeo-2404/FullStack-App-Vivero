import { regexFecha, regexEnteroPositivo, formatoFechaDB, regexFlotantePositivo } from "../helpers/utils.js";
import { crear_compra_producto } from "./CompraProductoController.js";
import Producto from "../models/ProductoModel.js";
import Compra from "../models/CompraModel.js";
import Proveedor from "../models/ProveedorModel.js";
import CompraProducto from "../models/CompraProductoModel.js";

// Crear una compra
const crear_compra = async (req, res) => { 
    const { id_proveedor, productos:productos_proveedor } = req.body;

    // Validacion campos no vacios
    if(!productos_proveedor || !id_proveedor) {
        const error = new Error("Todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    let total = 0; //total de compra

    // Se crea la fecha
    let date = new Date();
    let dia = date.getDate().toString().padStart(2, "0");
    let mes = (date.getMonth() + 1).toString().padStart(2, 0);
    let anio = date.getFullYear();

    let fecha = formatoFechaDB(`${dia}-${mes}-${anio}`); //fecha de compra DD-MM-YYYY

    // Validamos formato de fecha
    if(!fecha.match(regexFecha)) {
        const error = new Error("Formato de fecha invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    // Buscar el proveedor
    const existeProveedor = await Proveedor.findOne({where: {id: id_proveedor}});

    // Verificar que existe proveedor
    if(!existeProveedor) {
        const error = new Error("Proveedor no existe");
        res.status(404).json({msg: error.message});
    }

    try {
        const compra = await Compra.create({ id_proveedor, fecha, total }); //creamos la compra

        // Iteramos sobre el arreglo de productos_proveedor
        productos_proveedor.forEach(async producto => {
            // Con cada proveedor_producto creamos un registro de compra_producto
            let subtotal = producto.precio_compra * producto.cantidad;
            total += subtotal // Al total a pagar le sumamos el precio de cada producto
            let respuesta = await crear_compra_producto({
                id_compra: compra.id,
                id_producto: producto.id,
                cantidad: producto.cantidad,
                subtotal
            });
            // console.log({respuesta});
            
            // Sumamos la cantidad al Producto
            let prod = await Producto.findByPk(producto.id);
            prod.cantidad += producto.cantidad;
            await prod.save();
        });
        compra.total = total;
        await compra.save();

        res.status(200).json(compra);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }    
}

// Retornar todas las ventas
const obtener_compras = async  (req, res) => {
    const { limite, id, id_proveedor, fecha, total } = req.query;

    //validar que ID es un entero
    if (id) {
        if (!regexEnteroPositivo.test(id)) {
            const error = new Error("El ID debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que proveedor id es un entero
    if (id_proveedor) {
        if (!regexEnteroPositivo.test(id_proveedor)) {
            const error = new Error("El Proveedor ID debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que Limite es un entero
    if (limite) {
        if (!regexEnteroPositivo.test(limite)) {
            const error = new Error("El Limite debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que fecha es un entero
    if (fecha) {
        if (!regexFecha.test(fecha)) {
            const error = new Error("La fecha debe ser YYYY-MM-DD");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que total es un entero
    if (total) {
        if (!regexFlotantePositivo.test(total) || !regexEnteroPositivo(total)) {
            const error = new Error("El total debe tener un formato valido");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    const where = {};
    if(id) where.id = id;
    if(id_proveedor) where.id_proveedor = id_proveedor;
    if(fecha) where.fecha = fecha;
    if(total) where.total = total;
    
    //consultar los productos en base al compra
    let consulta = await Compra.findAll({ 
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

//edita una compra en especifico
const editar_compra = async  (req, res) => {
}

//elimina una compra en especifico
const eliminar_compra = async (req, res) => {
    const { id } = req.query; //leer el id de la compra

    if(!id) {
        const error = new Error("El ID es obligario");
        res.status(400).json({ msg: error.message });
        return;
    }

    const compra = await Compra.findByPk(id); //buscamos compra por id

    //validamos si la compra no se encuentra
    if(!compra) {
        const error = new Error(`La Compra con el ID ${id} no se encuentra`);
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        // Primero borramos todos los compra_producto que refieren a esta id
        let comprasProductos = await CompraProducto.findAll({ where: { id_compra: id } });
        comprasProductos.forEach(async compraProducto => {
            await compraProducto.destroy();
        })

        // Ahora sí borramos la compra
        await compra.destroy(); //destuimos el registro de compra
        res.json(compra);
    } catch (e) {
        console.log({e});
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_compra,
    obtener_compras,
    editar_compra,
    eliminar_compra,
}