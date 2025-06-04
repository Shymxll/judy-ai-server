"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Application configuration
 */
require('dotenv').config();
const appConfig = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/legal-case-management'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        cookieName: process.env.JWT_COOKIE_NAME || 'token'
    }
};
exports.default = appConfig;
