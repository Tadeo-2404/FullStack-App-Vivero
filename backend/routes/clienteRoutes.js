import express from 'express';
const router = express.Router();
import { confirmar_cuenta, inciar_sesion, inicio, nueva_contrasena, olvide_contrasena, registrarse } from '../controllers/ClienteController.js';

//inicio (mostrar todos los productos)
router.get('/', inicio);

//iniciar sesion (permitir inicio de sesion)
router.post('/iniciar-sesion', inciar_sesion);

//registrar cuenta (permitir crear cuenta)
router.post('/registrarse', registrarse);

//confirmar cuenta usando token de autenticacion
router.get('/confirmar-cuenta', confirmar_cuenta);

//obtener token contraseña temporal
router.get('/olvide-contrasena', olvide_contrasena);

//enviar nueva contrasena
router.post('/nueva-contrasena', nueva_contrasena);

export default router;