/**
 * Express application setup
 */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import errorHandler from './middleware/errorHandler';
// Eğer notFoundHandler yoksa, aşağıdaki satırı yorum satırı yapabilirsin.
// import notFoundHandler from './middleware/notFoundHandler';
import routes from './routes';

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // CORS support
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', routes);

// Home route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Judy AI API',
    status: 'running'
  });
});

// Eğer notFoundHandler yoksa, aşağıdaki satırı yorum satırı yapabilirsin.
// app.use(notFoundHandler);
app.use(errorHandler); // Global error handler

export default app;