"use strict";
/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const response = {
        success: false,
        error: {
            message: err.message || 'Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    };
    console.error(`[Error] ${err.message}`, err.stack);
    res.status(statusCode).json(response);
};
module.exports = errorHandler;
