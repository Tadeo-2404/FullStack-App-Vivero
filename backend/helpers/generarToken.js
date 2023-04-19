import randomstring from "randomstring";

/* cuando el usuario solicita una nuvea contraseña, se crea un token temporal que verifica cual usuario solicito el cambio
http:/admin/nueva-contrasena/:token-generado */

const generarToken = () => {
    return randomstring.generate();
}

export default generarToken;