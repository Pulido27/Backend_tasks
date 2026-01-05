import * as taskService from '../services/task.service.js';

export async function getMyTasks(req, res, next) {
    try {
        const userId = req.user.id;

        const tasks = await taskService.getMyTasks(userId);

    } catch (error) {
        next(error);
    }
} 