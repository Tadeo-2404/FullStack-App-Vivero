
//rutas publicas
const inciar_sesion = (req, res) => {
    res.json({msg: "inciar sesion"})
}

const olvide_contrasena = (req, res) => {
    res.json({msg: "olvide contraseña"})
}

const nueva_contrasena = (req, res) => {
    res.json({msg: "nueva contraseña"})
}

//rutas privadas
const incio = (req, res) => {
    res.json({msg: "desde incio"});
}

const publicar_producto = (req, res) => {
    res.json({msg: 'agregando producto'});
}

const editar_producto = (req, res) => {
    res.json({msg: 'editando producto'});
}

const eliminar_producto = (req, res) => {
    res.json({msg: 'eliminando producto'});
}


export {
    inciar_sesion,
    olvide_contrasena,
    nueva_contrasena,
    incio,
    publicar_producto,
    editar_producto,
    eliminar_producto
}