import { v4 as uuidv4} from 'uuid';
import pool from '../config/db.js';

export async function createTask({ userId, title}) {
    const id = uuidv4();

    const query = `INSERT INTO tasks (id, user_id, title)
    VALUES (?,?,?)`;

    await pool.execute(query, [id, userId, title]);

    return {
        id,
        title,
        completed: false,
    };
}

export async function findByUserId(userId) {

    const query = `
    SELECT id, title, completed, created_at
    FROM tasks 
    WHERE user_id = ?
        AND deleted_at IS NULL
        ORDER BY CREATED_AT DESC
    `
    const [rows] = await pool.execute(query, [userId])

    return rows;
}

export async function findTaskByIdAndUser({ taskId, userId, onlyActive = true }) {
    
    let query = `
        SELECT id, title, completed, deleted_at
        FROM tasks
        WHERE id = ?
        AND user_id = ?
    `;

    if (onlyActive) {
        query += ` AND deleted_at IS NULL`;
    }

    const [rows] = await pool.execute(query, [taskId, userId]);
    return rows.length ? rows[0] : null;
}


export async function updateCompleted(taskId, completed) {
    const query = `
        UPDATE tasks
        SET completed = ?
        WHERE id = ?
    `;

    await pool.execute(query, [completed, taskId]);
}

export async function softDeletedTask(taskId) {
    const query = `
        UPDATE tasks 
        SET deleted_at = NOW()
        WHERE id = ?
    `;

    await pool.execute(query,[taskId]);

}