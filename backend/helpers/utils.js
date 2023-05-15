//! Expresiones regulares
// Expresion regular para validar correo
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Expresion regular para validar nombre, apellido
const regexNombreCompleto = /^[a-zA-ZÀ-ÿ'-]{1,30}(\s?[a-zA-ZÀ-ÿ'-]{0,30})+$/;
// Expresion regular para validar contraseña
const regexPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?!.*\s).{8,30}$/;
// Expresion regular para validar telefonos
const regexTelefono = /^\d{10}$/;
// Expresion regular para validar formato de fecha (formato de la base de datos)
const regexFecha = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
// Expresion regular para validar enteros positivos
const regexEnteroPositivo = /^[1-9][0-9]*$/;
// Expresion regular para validar cadenas de caracteres
const regexCadena = /.*/;
// Expresion regular para validar flotante positivo
const regexFlotantePositivo = /^\d+(\.\d+)?$/;
// Expresion regular para validar el CP
const regexCP = /^\d{5}$/;
// Expresion regular para validar el RFC
const regexRFC = /^([A-ZÑ&]{3,4})(\d{2})(\d{2})(\d{2})([A-Z\d]{3})$/;
// Expresion regulara para validar numero de casa
const regexNumeroCasa = /^\d+[A-Za-z]?$/;

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
    regexCadena,
    regexFlotantePositivo,
    regexCP,
    regexRFC,
    regexNumeroCasa,
    formatoFechaDB
}