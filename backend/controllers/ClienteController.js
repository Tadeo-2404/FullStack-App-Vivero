
const inciar_sesion = (req, res) => {
    res.json({msg: "inciar sesion"})
}

const registrarse = (req, res) => {
    res.json({msg: "registrarse"});
}

const confirmar_cuenta = (req, res) => {
    res.json({msg: "confirmar cuenta"});
}

const olvide_contraseña = (req, res) => {
    res.json({msg: "olvide contraseña"})
}

const nueva_contraseña = (req, res) => {
    res.json({msg: "nueva contraseña"})
}

export {
    inciar_sesion,
    registrarse,
    confirmar_cuenta,
    olvide_contraseña,
    nueva_contraseña
}