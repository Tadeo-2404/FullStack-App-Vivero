import Administrador from "../models/AdminModel.js"; //modelo de admin
import bcrypt from 'bcrypt'; //encriptar password
import generarJWT from "../helpers/generarJWT.js"; //enviar info a frontend

//rutas publicas
const registrarse = async (req, res) => {
    const { nombre, apellido, correo, contrasena } = req.body; //leer input de usuario

    const duplicado = await Administrador.findOne({where: {correo: correo}}); //verificamos si el correo se duplica

    if(duplicado) {
        const error = new Error("correo duplicado");
        res.status(404).json({ msg: error.message });
        return;
    }

    //crear objeto con la informacion recibida
    const data = {
        nombre, 
        apellido,
        correo,
        contrasena: await bcrypt.hash(contrasena, 10),
    };

    try {
        const admin = await Administrador.create(data); //crear admin
        let token = generarJWT(admin.id); //generar jwt 
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true }); //generar cookie

        //retornar respuesta
        return res.status(201).send({msg: "cuenta creada exitosamente"});
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({ msg: error.message });
    }
};

const iniciar_sesion = async (req, res) => {
    const { correo, contrasena } = req.body //leer input usuario
    const admin = await Administrador.findOne({ where: { correo: correo } }); //busca usuario

    //si no se encuentra ese usuario
    if (!admin) {
        const error = new Error("registro no encontrado");
        res.status(404).json({ msg: error.message });
        return;
    }

    try {
        const valido = await bcrypt.compare(contrasena, admin.contrasena); //verificamos las crendenciales

        //arrojamos error si no son validas
        if (!valido) {
            const error = new Error("contraseña incorrecta");
            res.status(400).json({ msg: error.message });
            return;
        }

        let token = generarJWT(admin.id); //generar jwt 
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true }); //generar cookie

        //retornar respuesta
        return res.status(201).send({msg: "bienvenido"});

    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({ msg: error.message });
    }
}

const olvide_contrasena = (req, res) => {
    res.json({ msg: "olvide contraseña" })
}

const nueva_contrasena = (req, res) => {
    res.json({ msg: "nueva contraseña" })
}


export {
    registrarse,
    iniciar_sesion,
    olvide_contrasena,
    nueva_contrasena,
}