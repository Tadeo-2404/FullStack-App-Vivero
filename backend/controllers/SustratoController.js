import Sustrato from "../models/SustratoModel.js";

const crear_sustrato = async (req, res) => {
    const { nombre, descripcion, precio, cantidad} = req.body; //leer input usuario
    
    if(!nombre || !descripcion || !precio || !cantidad) {
        const error = new Error("todos los campos son obligatorios");
        res.status(400).json({msg: error.message});
        return;
    }

    try {
        const sustrato =  new Sustrato(req.body);
        await sustrato.save();
        res.json(sustrato);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//retornar todos los sustratos
const obtener_sustratos = async  (req, res) => {
    const { limite } = req.query;
    let consulta = await Sustrato.findAll({ limit: limite }) //realiza la consulta

    //muestra error si no hay sustratos
    if(!consulta) {
        const error = new Error("No hay sustratos");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna sustratos
}

//retorna un sustrato en especifico por ID
const obtener_sustrato =  async (req, res) => {
    const { id } = req.params; //leer el id del sustrato
    const consulta = await Sustrato.findByPk(id); //realiza la consulta

    //si el sustrato no se encuentra
    if(!consulta) {
        const error = new Error("sustrato no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    res.json(consulta); //retorna sustrato
}

//edita un sustrato en especifico
const editar_sustrato = async  (req, res) => {
    const { nombre, descripcion, precio, cantidad} = req.body; //leer input usuario
    const { id } = req.params; //leer el id del sustrato
    const sustrato = await Sustrato.findByPk(id);

    if(!sustrato) {
        const error = new Error("sustrato no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    //asignamos valores
    sustrato.nombre = nombre || sustrato.nombre;
    sustrato.descripcion = descripcion || sustrato.descripcion;
    sustrato.precio = precio || sustrato.precio;
    sustrato.cantidad = cantidad || sustrato.cantidad;

    try {
        await sustrato.save();
        res.json(sustrato);
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}

//elimina un sustrato en especifico
const eliminar_sustrato = async (req, res) => {
    const { id } = req.params; //leer el id del sustrato
    const sustrato = await Sustrato.findByPk(id);

    if(!sustrato) {
        const error = new Error("sustrato no encontrado");
        res.status(404).json({msg: error.message});
        return;
    }

    try {
        await sustrato.destroy();
        res.json("sustrato eliminado");
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({msg: error.message});
    }
}


export {
    crear_sustrato,
    obtener_sustratos,
    obtener_sustrato,
    editar_sustrato,
    eliminar_sustrato,
}