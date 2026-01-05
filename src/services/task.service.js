import * as taskModel from '../models/task.model.js';


export async function getTaskByUser(userId) {
    if (!userId) {
        throw new AppError('User ID is required', 400);
    }

    const tasks = await taskModel.findByUserId(userId);

    return tasks;
}

export async function createTask({ title, userId}) {
    if (!title) {
       throw new AppError('Title is required', 400); 
    }

    if (!userId) {
        throw new AppError('User ID is required', 400);
    }

    const task = await taskModel.createTask({
        title,
        userId,
    });

    return task;
}

export async function completedTask({ taskId, userId }) {
    if(!taskId) {
        throw new AppError('Task ID is required', 400);
    }

    const task = await taskModel.findByIdAndUser(taskId, userId);

    if (!task) {
    throw new AppError('Task not found', 404);
  }

  if (task.completed) {
    return task; // idempotente
  }

  await taskModel.updateCompleted(taskId, true);

  return {
    id: taskId,
    completed: true,
  };

}
