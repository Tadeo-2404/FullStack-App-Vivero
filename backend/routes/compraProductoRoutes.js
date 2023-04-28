import express from 'express';
const router = express.Router();
import { obtener_compra_productos, editar_compra_producto, eliminar_compra_producto } from '../controllers/CompraProductoController.js';

// Obtener todos los productos
router.get('/', obtener_compra_productos);

// Editar producto
router.put('/', editar_compra_producto);

// Eliminar producto
router.delete('/', eliminar_compra_producto);

export default router;