import express from 'express';
const router = express.Router();
import { obtener_sustratos, obtener_sustrato, editar_sustrato, eliminar_sustrato, crear_sustrato } from '../controllers/SustratoController.js';

//crear sustrato
router.post('/', crear_sustrato);

//obtener todos los sustratos
router.get('/', obtener_sustratos);

//obtener un sustrato
router.get('/:id', obtener_sustrato);

//editar sustrato
router.put('/:id', editar_sustrato);

//eliminar sustrato
router.delete('/:id', eliminar_sustrato);

export default router;