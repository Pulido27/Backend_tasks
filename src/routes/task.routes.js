import { Router } from "express";
import * as taskController from '../controllers/task.controller.js'
import { authenticate as authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, taskController.getMyTasks);
router.post('/', authMiddleware, taskController.createTask);
router.patch('/:id/complete', authMiddleware, taskController.completeTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

export default router;