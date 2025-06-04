"use strict";
/**
 * Application configuration
 */
require('dotenv').config();
const config = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/legal-case-management'
    }
};
module.exports = config;
