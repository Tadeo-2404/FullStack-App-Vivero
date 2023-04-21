import Proveedor from "../models/ProveedorModel.js";
import { regexNombreCompleto, regexTelefono } from "../utils.js";

//crear un proveedor
const crear_proveedor = async (req, res) => {
    const { nombre, telefono } = req.body; //leer input usuario

    //validamos los campos
    if(!nombre || !telefono) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    if(!nombre.match(regexNombreCompleto)) {
        const error = new Error("nombre solo debe contener caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    if(!telefono.match(regexTelefono)) {
        const error = new Error("telefono debe contener 10 digitos y solo numeros 0-9");
        res.status(400).json({ msg: error.message });
        return;
    }

    try {
        //crear objeto proveedor
        const proveedor =  new Proveedor(req.body);

        //guardar el objeto en la base de datos
        await proveedor.save();
        res.json(proveedor);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los proveedores
const obtener_proveedores = async  (req, res) => {
    const { limite } = req.query;
    let consulta = await Proveedor.findAll({ limit: limite }); // Realiza la consulta

    //muestra error si no hay proveedores
    if(!consulta) {
        const error = new Error("No hay proveedores");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna consulta
}

//retorna un proveedor en especifico por ID
const obtener_proveedor =  async (req, res) => {
    const { id } = req.params; //leer el id del proveedor
    const consulta = await Proveedor.findByPk(id); //realiza la consulta

    //si el proveedor no se encuentra
    if(!consulta) {
        const error = new Error("proveedor no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna proveedor
}

//edita un proveedor en especifico
const editar_proveedor = async  (req, res) => {
    const { nombre, telefono } = req.body; //leer input usuario
    const { id } = req.params; //leer el id del proveedor
    const proveedor = await Proveedor.findByPk(id);

    if(!proveedor) {
        const error = new Error("proveedor no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    if(!nombre.match(regexNombreCompleto)) {
        const error = new Error("nombre solo debe contener caracteres");
        res.status(400).json({ msg: error.message });
        return;
    }

    if(!telefono.match(regexTelefono)) {
        const error = new Error("telefono debe contener 10 digitos y solo numeros 0-9");
        res.status(400).json({ msg: error.message });
        return;
    }


    //asignamos valores
    proveedor.nombre = nombre || proveedor.nombre;
    proveedor.telefono = telefono || proveedor.telefono;

    try {
        await proveedor.save(); //guardamos el proveedor
        res.json(proveedor);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un proveedor en especifico
const eliminar_proveedor = async (req, res) => {
    const { id } = req.params; //leer el id del proveedor
    const proveedor = await Proveedor.findByPk(id);

    //arrojamos error si no se encuentra
    if(!proveedor) {
        const error = new Error("proveedor no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await proveedor.destroy(); //eliminamos el proveedor
        res.json("proveedor eliminado");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_proveedor,
    obtener_proveedores,
    obtener_proveedor,
    editar_proveedor,
    eliminar_proveedor,
}