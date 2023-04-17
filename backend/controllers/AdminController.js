import Administrador from "../models/AdminModel.js";

//rutas publicas
const iniciar_sesion = (req, res) => {
    const { correo, contrasena } = req.body;

}

const olvide_contrasena = (req, res) => {
    res.json({msg: "olvide contraseña"})
}

const nueva_contrasena = (req, res) => {
    res.json({msg: "nueva contraseña"})
}


export {
    iniciar_sesion,
    olvide_contrasena,
    nueva_contrasena,
}