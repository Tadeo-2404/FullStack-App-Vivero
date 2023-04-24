import Producto from "../models/ProductoModel.js";

const crear_producto = async (req, res) => {
    const { nombre, descripcion, precio, cantidad} = req.body; //leer input usuario
    
    if(!nombre || !descripcion || !precio || !cantidad) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    try {
        const producto = await Producto.create(req.body);
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los productos
const obtener_productos = async  (req, res) => {
    const { limite } = req.query;
    let consulta = await Producto.findAll({ limit: limite }); // Realiza la consulta

    //muestra error si no hay productos
    if(!consulta) {
        const error = new Error("No hay productos");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna producto
}

//retorna un producto en especifico por ID
const obtener_producto =  async (req, res) => {
    const { id } = req.params; //leer el id del producto
    const consulta = await Producto.findByPk(id); //realiza la consulta

    //si el producto no se encuentra
    if(!consulta) {
        const error = new Error("Producto no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna producto
}

//edita un producto en especifico
const editar_producto = async  (req, res) => {
    const { nombre, descripcion, precio, cantidad } = req.body; //leer input usuario
    const { id } = req.params; //leer el id del producto
    const producto = await Producto.findByPk(id);

    if(!producto) {
        const error = new Error("Producto no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    //asignamos valores
    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.cantidad = cantidad || producto.cantidad;

    try {
        await producto.save();
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un producto en especifico
const eliminar_producto = async (req, res) => {
    const { id } = req.params; //leer el id del producto
    const producto = await Producto.findByPk(id);

    if(!producto) {
        const error = new Error("Producto no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await producto.destroy();
        res.json(producto);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_producto,
    obtener_productos,
    obtener_producto,
    editar_producto,
    eliminar_producto,
}