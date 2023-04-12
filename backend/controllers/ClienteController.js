
//controller para la pagina de incio (no login necesario)
const inicio = (req, res) => {
    res.json({msg: "desde incio"});
}

//controller para iniciar sesion
const inciar_sesion = (req, res) => {
    res.json({msg: "inciar sesion"})
}

//controller para registrarse
const registrarse = (req, res) => {
   console.log(req.body);
}

//controller para confirmar cuenta
const confirmar_cuenta = (req, res) => {
    res.json({msg: "confirmar cuenta"});
}

//controller para solicitar cambio de contraseña
const olvide_contrasena = (req, res) => {
    res.json({msg: "olvide contraseña"})
}

//controller para la nueva contraseña
const nueva_contrasena = (req, res) => {
    res.json({msg: "nueva contraseña"})
}

export {
    inicio,
    inciar_sesion,
    registrarse,
    confirmar_cuenta,
    olvide_contrasena,
    nueva_contrasena
}