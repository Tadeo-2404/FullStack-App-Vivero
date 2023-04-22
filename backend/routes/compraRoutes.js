import express from 'express';
const router = express.Router();
import { obtener_compras, obtener_compra, crear_compra, editar_compra, eliminar_compra } from '../controllers/CompraController.js';

//crear producto
router.post('/', crear_compra);

//obtener todos los productos
router.get('/', obtener_compras);

//obtener un producto
router.get('/:id', obtener_compra);

//editar producto
router.put('/:id', editar_compra);

//eliminar producto
router.delete('/:id', eliminar_compra);

export default router;