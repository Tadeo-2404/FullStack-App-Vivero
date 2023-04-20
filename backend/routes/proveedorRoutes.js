import express from 'express';
const router = express.Router();
import { crear_proveedor, editar_proveedor, eliminar_proveedor, obtener_proveedor, obtener_proveedores } from '../controllers/ProveedorController.js';

//crear producto
router.post('/', crear_proveedor);

//obtener todos los productos
router.get('/', obtener_proveedores);

//obtener un producto
router.get('/:id', obtener_proveedor);

//editar producto
router.put('/:id', editar_proveedor);

//eliminar producto
router.delete('/:id', eliminar_proveedor);

export default router;