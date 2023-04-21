//! Expresiones regulares
// Expresion regular para validar correo
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Expresion regular para validar nombre, apellido
const regexNombreCompleto = /^[a-zA-ZÀ-ÿ'-]{1,30}\s?[a-zA-ZÀ-ÿ'-]{0,30}$/;
// Expresion regular para validar contraseña
const regexPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?!.*\s).{8,30}$/;
// Expresion regular para validar telefonos
const regexTelefono = /^\d{10}$/;
// Expresion regular para validar formato de fecha (formato de la base de datos)
const regexFecha = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
// Expresion regular para validar enteros positivos
const regexEnteroPositivo = /^[1-9][0-9]*$/;

//! Funciones de formato
function formatoFechaDB(fecha){
    // DD-MM-YYYY -> YYYY-MM-DD
    return fecha.split(/[-/]/g).reverse().join("-");
}

export {
    regexCorreo,
    regexNombreCompleto,
    regexPasswd,
    regexTelefono,
    regexFecha,
    regexEnteroPositivo,
    formatoFechaDB
}