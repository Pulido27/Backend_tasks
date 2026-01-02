import * as userModel from '../models/user.model.js';
import AppError from '../errors/AppError.js';

export async function registerUser({ email, password }) {
    
    if (!email || !password) {
        throw new AppError('Email and password are required', 400);
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        throw new AppError("Email already in use",409);
    }
    
    const user = await userModel.createUser({ email, password});

    return user;
}