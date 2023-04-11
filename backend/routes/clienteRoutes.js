import express from 'express';
const router = express.Router();
import { confirmar_cuenta, inciar_sesion, nueva_contraseña, olvide_contraseña, registrarse } from '../controllers/ClienteController.js';

router.post('/', inciar_sesion);
router.post('/registrarse', registrarse);
router.get('/confirmar_cuenta', confirmar_cuenta);
router.get('/olvide_contraseña', olvide_contraseña);
router.post('/nueva_contraseña', nueva_contraseña);

export default router;