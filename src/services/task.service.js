import * as taskmodel from '../models/task.model.js';

export async function getTaskByUser(userId) {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const tasks = await taskmodel.findByUserId(userId);

    return tasks;
}

