import CompraProducto from "../models/CompraProductoModel.js"; //importar modelo Compra_Producto
import Compra from "../models/CompraModel.js"; //importar modelo Compra
import { regexEnteroPositivo } from "../helpers/utils.js"; //importar regex para entero positivo

//crear un registro compra_producto
const crear_compra_producto = async (datos) => {
    const {id_compra, id_producto, cantidad, subtotal} = datos; //leer datos
    
    //VALIDACIONES DATOS
    // Validamos que el formato de id_compra sea valido
    if(!regexEnteroPositivo.test(id_compra)) {
        const error = new Error("El id_compra debe ser un entero positivo");
        return { msg: error.message };
    }

    // Validamos que el formato de id_proveedor sea valido
    if(!regexEnteroPositivo.test(id_producto)) {
        const error = new Error("El id_producto debe ser un entero positivo");
        return { msg: error.message };
    }

    // Validamos que el formato de cantidad sea valido
    if(!regexEnteroPositivo.test(cantidad)) {
        const error = new Error("La cantidad debe ser un entero positivo");
        return { msg: error.message };
    }

    // Validamos que el formato de subtotal sea valido
    if(!regexEnteroPositivo.test(subtotal)) {
        const error = new Error("El subtotal debe ser un entero positivo");
        return { msg: error.message };
    }

    //buscar Compra por ID
    const existeCompra = await Compra.findByPk(id_compra);

    //validacion existeCompra
    if(!existeCompra) {
        const error = new Error(`La Compra con el ID ${id_compra} no existe`);
        return { msg: error.message };
    }

    try {
        const compra_producto = await CompraProducto.create(datos);
        console.log("compraproducto", compra_producto);
        return compra_producto;
    } catch (e) {
        console.log({e});
        const error = new Error(e.name);
        return {msg: error.message};
    }
}

//obtener todos los registros de compra_producto
const obtener_compra_productos = async (req, res) => {
    const { limite, id_compra, id_producto, cantidad, id } = req.query;

    //validar que ID es un entero
    if (id) {
        if (!regexEnteroPositivo.test(id)) {
            const error = new Error("El ID debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que id compra es un entero
    if (id_compra) {
        if (!regexEnteroPositivo.test(id_compra)) {
            const error = new Error("El ID_Compra debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que id_producto es un entero
    if (id_producto) {
        if (!regexEnteroPositivo.test(id_producto)) {
            const error = new Error("El ID Producto debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    //validar que limite es un entero
    if (limite) {
        if (!regexEnteroPositivo.test(limite)) {
            const error = new Error("El Limite debe ser un entero positivo");
            res.status(400).json({ msg: error.message });
            return;
        }
    }

    const where = {};
    if(id_compra) where.id_compra = id_compra;
    if(id_producto) where.id_producto = id_producto;
    if(cantidad) where.cantidad = cantidad;
    if(id) where.id = id;

    //consultar los productos en base al compra
    let consulta = await CompraProducto.findAll({ 
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

//editar un registro de compra_producto
const editar_compra_producto = async (req, res) => {
    const { id } = req.query; //leer ID's
    const { cantidad } = req.body; //leer de formulario

    if(!id) {
        const error = new Error("Parametro ID requerido");
        res.status(400).json({ msg: error.message });
        return;
    }

    // Validamos que el formato de id sea valido
    if(!id.match(regexEnteroPositivo)) {
        const error = new Error("El id debe ser un entero positivo");
        res.status(400).json({ msg: error.message });
        return;
    }

    // Validamos que el formato de la cantidad sea valido
    if(!cantidad.match(regexEnteroPositivo)) {
        const error = new Error("La cantidad debe ser un entero positivo");
        res.status(400).json({ msg: error.message });
        return;
    }

    // Buscamos el registro compra_producto que contenga el mismo ID y el ID de compra
    const compra_producto = await CompraProducto.findOne({where: {id:id}}); //el que queremos editar

    // Validamos si no existe
    if(!compra_producto) {
        const error = new Error(`Registro con el ID ${id} no encontrado`);
        res.status(404).json({msg: error.message});
        return;
    }

    //buscar compra a la que pertenece el registo para actualizar el total
    const obtenerCompra = await Compra.findByPk(compra_producto.id_compra);

    //restamos el subtotal al total de la compra
    obtenerCompra.total -= compra_producto.subtotal;

    //asignamos la cantidad actualiza a la compra
    compra_producto.cantidad ||= cantidad;

    //asignamos el nuevo valor de subtotal al registro de compra_producto
    compra_producto.subtotal = subtotal;

    //actualizamos el valor del total sumando el nuevo subtotal
    obtenerCompra.total += subtotal;

    try {
        //guardamos cambios
        await obtenerCompra.save(); 
        await compra_producto.save();
        res.json({compra_producto, obtenerCompra});
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//eliminar un registro de compra_producto
const eliminar_compra_producto = async (req, res) => {
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

    const compra_producto = await CompraProducto.findAll({where});

    //validamos si no existe
    if(!compra_producto) {
        const error = new Error(`No existen registros compra_producto`);
        res.status(404).json({msg: error.message});
        return;
    }
    
    try {
        // Se borran los elementos compra_producto
        let promesas = compra_producto.map(async cp => {
            //obtener la compra a la que pertenece para restarle el subtotal al total
            const compra = await Compra.findByPk(cp.id_compra);

            //restar subtotal al total
            compra.total -= cp.subtotal;

            await cp.destroy();

            if(compra.total <= 0) await compra.destroy();
            else await compra.save();
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
    crear_compra_producto,
    obtener_compra_productos,
    editar_compra_producto,
    eliminar_compra_producto
}