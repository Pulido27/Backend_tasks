import * as authService from '../services/auth.service.js';

export async function register(req, res, next) {
    try {

        const { email, password } = req.body;
        
        const user = await authService.registerUser({ email, password});
        res.status(201).json({
            error: false,
            data: user,
        });

    } catch (error) {
        next(error);
    }
}
