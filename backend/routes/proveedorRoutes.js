import express from 'express';
const router = express.Router();
import { crear_proveedor, editar_proveedor, eliminar_proveedor, obtener_proveedores } from '../controllers/ProveedorController.js';

//crear producto
router.post('/', crear_proveedor);

//obtener todos los productos
router.get('/', obtener_proveedores);

//editar producto
router.put('/', editar_proveedor);

//eliminar producto
router.delete('/', eliminar_proveedor);

export default router;