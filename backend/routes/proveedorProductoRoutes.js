import express from 'express';
const router = express.Router();
import { obtener_proveedor_producto, obtener_proveedor_productos, editar_proveedor_producto, eliminar_proveedor_producto } from '../controllers/ProveedorProductoController.js';

// Obtener todos los productos
router.get('/:id_proveedor', obtener_proveedor_productos);

// Obtener un producto
router.get('/:id_proveedor/:id', obtener_proveedor_producto);

// Editar producto
router.put('/:id_proveedor/:id', editar_proveedor_producto);

// Eliminar producto
router.delete('/:id_proveedor/:id', eliminar_proveedor_producto);

export default router;