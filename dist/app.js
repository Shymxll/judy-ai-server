"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Express application setup
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
// Eğer notFoundHandler yoksa, aşağıdaki satırı yorum satırı yapabilirsin.
// import notFoundHandler from './middleware/notFoundHandler';
const routes_1 = __importDefault(require("./routes"));
// Initialize express app
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)()); // CORS support
app.use((0, morgan_1.default)('dev')); // Request logging
app.use(express_1.default.json()); // Parse JSON requests
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded requests
// Serve static files from 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// API routes
app.use('/api', routes_1.default);
// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Judy AI API',
        status: 'running'
    });
});
// Eğer notFoundHandler yoksa, aşağıdaki satırı yorum satırı yapabilirsin.
// app.use(notFoundHandler);
app.use(errorHandler_1.default); // Global error handler
exports.default = app;
