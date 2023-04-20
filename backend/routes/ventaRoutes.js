import express from 'express';
const router = express.Router();
import { obtener_ventas, obtener_venta, crear_venta, editar_venta, eliminar_venta } from '../controllers/VentaController.js'; //importar controllers

//crear producto
router.post('/', crear_venta);

//obtener todos los productos
router.get('/', obtener_ventas);

//obtener un producto
router.get('/:id', obtener_venta);

//editar producto
router.put('/:id', editar_venta);

//eliminar producto
router.delete('/:id', eliminar_venta);

export default router;