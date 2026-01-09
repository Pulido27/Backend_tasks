import { Router } from "express";
import * as taskController from '../controllers/task.controller.js'
import { authenticate as authMiddleware } from '../middlewares/auth.middleware.js';
import validateUuid from '../middlewares/validateUuid.middleware.js';

const router = Router();

router.get('/', authMiddleware, taskController.getMyTasks);
router.post('/', authMiddleware, taskController.createTask);
router.patch('/:id/complete', authMiddleware,  validateUuid('id'), taskController.completeTask);
router.delete('/:id', authMiddleware,  validateUuid('id'), taskController.deleteTask);

export default router;