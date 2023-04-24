import express from 'express';
const router = express.Router();
import { obtener_venta_producto, obtener_venta_productos, editar_venta_producto, eliminar_venta_producto } from '../controllers/VentaProductoController.js';

// Obtener todos los productos
router.get('/', obtener_venta_productos);

// Obtener un producto
router.get('/:id', obtener_venta_producto);

// Editar producto
router.put('/:id', editar_venta_producto);

// Eliminar producto
router.delete('/:id_venta/:id', eliminar_venta_producto);

export default router;