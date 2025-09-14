import { Router } from 'express';
import * as carreraController from '../controllers/carrera.controller.js';

const router = Router();

router.post('/', carreraController.create);
router.get('/', carreraController.getAll);
router.get('/:id', carreraController.getById);
router.patch('/:id', carreraController.update);
router.delete('/:id', carreraController.remove);

export default router;