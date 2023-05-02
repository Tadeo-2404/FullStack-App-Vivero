import express from 'express';
const router = express.Router();
import { obtener_venta_productos, editar_venta_producto, eliminar_venta_producto } from '../controllers/VentaProductoController.js';

// Obtener todos los productos
router.get('/', obtener_venta_productos);

// Editar producto
router.put('/', editar_venta_producto);

// Eliminar producto
router.delete('/', eliminar_venta_producto);

export default router;