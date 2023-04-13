
//rutas publicas
const inicio = (req, res) => {
    res.json({msg: "desde incio"});
}

const inciar_sesion = (req, res) => {
    res.json({msg: "inciar sesion"})
}

const registrarse = (req, res) => {
   console.log(req.body);
}

const confirmar_cuenta = (req, res) => {
    res.json({msg: "confirmar cuenta"});
}

const olvide_contrasena = (req, res) => {
    res.json({msg: "olvide contraseña"})
}

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