import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import AppError from '../errors/AppError.js';


export function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Authorization header missing',401);
    }

    const parts = authHeader.split(' ');
    const type = parts[0];
    const token = parts[1];

    if (type !== 'Bearer' || !token) {
        throw new AppError('Invalid authorization format', 401);
    }

    try {
        const decoded = jwt.verify(token, env.jwtSecret);

        req.user = decoded;

        next();
    } catch (error) {
        throw new AppError('Invalid or expired token', 401);
    }


}