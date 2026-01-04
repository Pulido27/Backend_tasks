import * as userModel from '../models/user.model.js';
import AppError from '../errors/AppError.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcrypt';


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

export async function loginUser({ email, password }) {
    
    if(!email || !password) {
        throw new AppError("Email and password are requiered", 400);
    }

    const user = await userModel.findByEmail(email);

    if(!user) {
        throw new AppError('Invalid credentials', 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if(!passwordMatch) {
        throw new AppError('Invalid credentials', 401);
    }

    return {
        user:{
            id: user.id,
            email: user.email,
        },
        token:generateToken({
            id: user.id,
            email: user.email,
        }),
    };
}