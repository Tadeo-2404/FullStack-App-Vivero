import express from 'express';
const router = express.Router();
import { confirmar_cuenta, inciar_sesion, nueva_contrasena, olvide_contrasena, registrarse } from '../controllers/ClienteController.js';

router.post('/', inciar_sesion);
router.post('/registrarse', registrarse);
router.get('/confirmar_cuenta', confirmar_cuenta);
router.get('/olvide_contrasena', olvide_contrasena);
router.post('/nueva_contrasena', nueva_contrasena);

export default router;