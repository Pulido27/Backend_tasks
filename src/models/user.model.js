import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export async function createUser({ email, password }) {

    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (id,email,password_hash) 
    VALUES (?,?,?)`;

    await pool.execute(query, [id,email, passwordHash]);

    return { id, email};
}


export async function findByEmail(email) {

    const query = `SELECT * FROM users WHERE email = ?`

    const [rows] = await pool.execute(query,[email]);

    return rows.length ? rows[0] : null;    
}