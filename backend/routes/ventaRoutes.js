import express from 'express';
const router = express.Router();
import { obtener_ventas, crear_venta, editar_venta, eliminar_venta } from '../controllers/VentaController.js';

//crear producto
router.post('/', crear_venta);

//obtener todos los productos
router.get('/', obtener_ventas);

//editar producto
router.put('/', editar_venta);

//eliminar producto
router.delete('/', eliminar_venta);

export default router;