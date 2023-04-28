import express from 'express';
const router = express.Router();
import { obtener_proveedor_productos, editar_proveedor_producto, eliminar_proveedor_producto } from '../controllers/ProveedorProductoController.js';

// Obtener todos los productos
router.get('/', obtener_proveedor_productos);

// Editar producto
router.put('/', editar_proveedor_producto);

// Eliminar producto
router.delete('/', eliminar_proveedor_producto);

export default router;