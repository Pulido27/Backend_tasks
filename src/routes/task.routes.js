import { Router } from "express";
import * as taskController from '../controllers/task.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router();

router.get('/', authMiddleware, taskController.getMyTasks);

export default router;