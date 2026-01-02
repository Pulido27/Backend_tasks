import AppError from '../errors/AppError.js';

export default function errorHandler(err, req, res, next) {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
                error: true,
                message: err.message,
        });
    }

    console.log(err);

    return res.status(500).json({
        error: true,
        message: 'Internal server error',
    });
}