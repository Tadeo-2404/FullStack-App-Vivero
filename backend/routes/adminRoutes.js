import express from 'express';
const router = express.Router();
import { inicio, iniciar_sesion, olvide_contrasena, nueva_contrasena, publicar_producto, editar_producto, eliminar_producto } from '../controllers/AdminController.js';

/* rutas publicas */
//pagina de incio (obtiene todos los productos, sucursales y sustratos)
router.get('/', inicio);

//inciar sesion
router.post('/iniciar_sesion', iniciar_sesion);

//obtener token contraseña temporal
router.get('/olvide-contrasena', olvide_contrasena);

//enviar nueva contrasena
router.post('/nueva-contrasena', nueva_contrasena);

/* rutas privadas */

//permite publicar un producto
router.post('/publicar', publicar_producto);

//permite editar un producto en base a su id
router.post('/editar/:id', editar_producto);

//permite eliminar un producto en base a su id
router.post('/eliminar/:id', eliminar_producto);

export default router;