import express from 'express';
const router = express.Router();
import { confirmar_cuenta, inciar_sesion, nueva_contrasena, olvide_contrasena, registrarse } from '../controllers/ClienteController.js';

//inciar sesion
router.post('/', inciar_sesion);

//registrar cuenta
router.post('/registrarse', registrarse);

//confirmar cuenta usando token de autenticacion
router.get('/confirmar_cuenta', confirmar_cuenta);

//obtener token contraseña temporal
router.get('/olvide_contrasena', olvide_contrasena);

//enviar nueva contrasena
router.post('/nueva_contrasena', nueva_contrasena);

export default router;