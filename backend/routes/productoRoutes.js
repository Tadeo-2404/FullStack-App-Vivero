import express from 'express';
const router = express.Router();
import { obtener_productos, obtener_producto, editar_producto, eliminar_producto, crear_producto } from '../controllers/ProductoController.js';

//crear producto
router.post('/crear-producto', crear_producto);

//obtener todos los productos
router.get('/obtener-productos', obtener_productos);

//obtener un producto
router.get('/obtener-producto/:id', obtener_producto);

//editar producto
router.put('/editar-producto/:id', editar_producto);

//eliminar producto
router.delete('/eliminar-producto/:id', eliminar_producto);

export default router;