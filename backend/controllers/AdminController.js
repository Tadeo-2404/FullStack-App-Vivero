
//rutas publicas
const iniciar_sesion = (req, res) => {
    res.json({msg: "iniciar sesion"})
}

const olvide_contrasena = (req, res) => {
    res.json({msg: "olvide contraseña"})
}

const nueva_contrasena = (req, res) => {
    res.json({msg: "nueva contraseña"})
}

//rutas privadas
const inicio = (req, res) => {
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
    iniciar_sesion,
    olvide_contrasena,
    nueva_contrasena,
    inicio,
    publicar_producto,
    editar_producto,
    eliminar_producto
}