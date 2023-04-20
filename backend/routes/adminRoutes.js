import express from 'express';
const router = express.Router();
import { iniciar_sesion, olvide_contrasena, nueva_contrasena, registrarse, comprobarToken } from '../controllers/AdminController.js';

/* rutas publicas */
//inciar sesion
router.post('/iniciar-sesion', iniciar_sesion);

//registrarse
router.post('/registrarse', registrarse);

//obtener token contraseña temporal
router.post('/olvide-contrasena', olvide_contrasena);

//verificar token
router.get('/nueva-contrasena/:token', comprobarToken),

//enviar nueva contrasena
router.post('/nueva-contrasena/:token', nueva_contrasena);

export default router;