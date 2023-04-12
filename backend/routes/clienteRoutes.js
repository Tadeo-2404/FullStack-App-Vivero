import express from 'express';
const router = express.Router();
import { confirmar_cuenta, inciar_sesion, inicio, nueva_contrasena, olvide_contrasena, registrarse } from '../controllers/ClienteController.js';

//inicio (mostrar todos los productos)
router.get('/', inicio);

//inciar sesion (permitir inicio de sesion)
router.post('/iniciar_sesion', inciar_sesion);

//registrar cuenta (permitir crear cuenta)
router.post('/registrarse', registrarse);

//confirmar cuenta usando token de autenticacion
router.get('/confirmar_cuenta', confirmar_cuenta);

//obtener token contraseña temporal
router.get('/olvide_contrasena', olvide_contrasena);

//enviar nueva contrasena
router.post('/nueva_contrasena', nueva_contrasena);

export default router;