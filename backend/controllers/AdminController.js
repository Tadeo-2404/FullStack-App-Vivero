import Administrador from "../models/AdminModel.js"; //modelo de admin
import bcrypt from 'bcrypt'; //encriptar password
import generarJWT from "../helpers/generarJWT.js"; //enviar info a frontend

//rutas publicas
const registrarse = async (req, res) => {
    const { nombre, apellido, correo, contrasena } = req.body; //leer input de usuario

    //expresion regular para validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //expresion regular para validar nombre, apellido
    const regexNombreCompleto = /^[a-zA-ZÀ-ÿ'-]{1,30}\s?[a-zA-ZÀ-ÿ'-]{0,30}$/;
    //expresion regular para validar contraseña
    const regexPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?!.*\s).{8,30}$/;

    //validamos correo
    if(!correo.match(regexCorreo)) {
        const error = new Error("correo invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    const duplicado = await Administrador.findOne({where: {correo: correo}}); //verificamos si el correo se duplica

    //si se duplica mandamos error
    if(duplicado) {
        const error = new Error("correo duplicado");
        res.status(404).json({ msg: error.message });
        return;
    }

    //validamos nombre
    if(!nombre.match(regexNombreCompleto)) {
        const error = new Error("nombre invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validamos apellido
    if(!apellido.match(regexNombreCompleto)) {
        const error = new Error("apellido invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //validamos contraseña
    if(!contrasena.match(regexPasswd)) {
        const error = new Error("La contraseña no cumple con los requisitos mínimos de seguridad. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un carácter especial y un número.");
        res.status(400).json({ msg: error.message });
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
        admin.token = token; //asignamos el token
        await admin.save();
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

    //expresion regular para validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //validamos correo
    if(!correo.match(regexCorreo)) {
        const error = new Error("correo invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

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
        admin.token = token; //asignar nuevo token
        await admin.save(); //guardar registro con nuevo token
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true }); //generar cookie

        //retornar respuesta
        return res.status(201).send({msg: "bienvenido"});

    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({ msg: error.message });
    }
}

const olvide_contrasena = async (req, res) => {
    const { correo } = req.body; //leer input del usuario

    //expresion regular para validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //validamos correo
    if(!correo.match(regexCorreo)) {
        const error = new Error("correo invalido");
        res.status(400).json({ msg: error.message });
        return;
    }

    //buscar registro en base al correo
    const encontrado = await Administrador.findOne({where: {correo: correo}});

    //validamos si no se encontro el correo
    if(!encontrado) {
        const error = new Error("registro no encontrado");
        res.status(404).json({ msg: error.message });
        return;
    }

    try {
        //se asigna el token
        encontrado.token = generarJWT(encontrado.id);

        //se guarda el registro con su nuevo token
        await encontrado.save();
        res.status(200).send({msg: `se ha enviado un correo a ${encontrado.correo} para restablecer tu contraseña`});
    } catch (e) {
        const error = new Error(e.name);
        res.status(404).json({ msg: error.message });
        return;
    }
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