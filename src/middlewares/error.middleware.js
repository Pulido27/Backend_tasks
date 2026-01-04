import AppError from '../errors/AppError.js';

export default function errorHandler(err, req, res, next) {

    if (err instanceof AppError) {

        return res.status(err.statusCode).json({
            success: false,
            error: {
                message: err.message,
            },
        });
    }

    console.log(err);

    return res.status(500).json({
        success: false,
        error: {
            message: 'Internal server error',
        },
    });


}