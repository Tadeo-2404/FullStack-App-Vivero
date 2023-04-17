import express from 'express';
const router = express.Router();
import { iniciar_sesion, olvide_contrasena, nueva_contrasena } from '../controllers/AdminController.js';

/* rutas publicas */
//inciar sesion
router.post('/iniciar-sesion', iniciar_sesion);

//obtener token contraseña temporal
router.get('/olvide-contrasena', olvide_contrasena);

//enviar nueva contrasena
router.post('/nueva-contrasena', nueva_contrasena);

export default router;