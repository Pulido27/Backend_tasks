import * as taskService from '../services/task.service.js';

export async function createTask(req, res, next) {
    try {
        const { title } = req.body || {};
        const userId = req.user.id;

        const task = await taskService.createTask({
            title,
            userId,
        });

        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
 }

export async function getMyTasks(req, res, next) {
    try {
        const userId = req.user.id;

        const tasks = await taskService.getTaskByUser(userId);

        res.status(200).json({
            success: true,
            data: tasks,
        });

    } catch (error) {
        next(error);
    }
} 

export async function completeTask(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await taskService.completedTask({
      taskId: id,
      userId,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try{
    const { id } = req.params;
    const userId = req.user.id;

    await taskService.deleteTask({
      taskId: id,
      userId,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}