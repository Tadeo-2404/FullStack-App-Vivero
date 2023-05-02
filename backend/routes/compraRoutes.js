import express from 'express';
const router = express.Router();
import { obtener_compras, crear_compra, editar_compra, eliminar_compra } from '../controllers/CompraController.js';

//crear producto
router.post('/', crear_compra);

//obtener todos los productos
router.get('/', obtener_compras);

//editar producto
router.put('/', editar_compra);

//eliminar producto
router.delete('/', eliminar_compra);

export default router;