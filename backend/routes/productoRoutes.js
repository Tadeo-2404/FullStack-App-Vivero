import express from 'express';
const router = express.Router();
import { obtener_productos, editar_producto, eliminar_producto, crear_producto } from '../controllers/ProductoController.js';

//crear producto
router.post('/', crear_producto);

//obtener todos los productos
router.get('/', obtener_productos);

//editar producto
router.put('/', editar_producto);

//eliminar producto
router.delete('/', eliminar_producto);

export default router;