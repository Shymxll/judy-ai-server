import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

/**
 * Global error handling middleware
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    error: {
      message: err.message || 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  logger.error(`[Error] ${err.message}`, { stack: err.stack });

  res.status(statusCode).json(response);
};

export default errorHandler;