"use strict";
/**
 * Express application setup
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const routes = require('./routes');
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
app.get('/', (req, res) => {
    res.json({
        message: 'Express Backend API',
        status: 'running'
    });
});
// Error handling
app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // Global error handler
module.exports = app;
