import * as userModel from '../models/user.model.js';

export async function registerUser({ email, password }) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
        throw new Error("Email already in use");
    }
    
    const user = await userModel.createUser({ email, password});

    return user;
}