import Compra from "../models/CompraModel.js";
import { regexFecha, regexEnteroPositivo, formatoFechaDB } from "../helpers/utils.js";

const crear_compra = async (req, res) => { 
}

// Retornar todas los compras
const obtener_compras = async  (req, res) => {
}

//retorna una compra en especifico por ID
const obtener_compra =  async (req, res) => {
}

//edita una compra en especifico
const editar_compra = async  (req, res) => {
}

//elimina una compra en especifico
const eliminar_compra = async (req, res) => {
}


export {
    crear_compra,
    obtener_compras,
    obtener_compra,
    editar_compra,
    eliminar_compra,
}