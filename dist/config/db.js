"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Database connection configuration
 */
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./index"));
const logger_1 = __importDefault(require("../utils/logger"));
/**
 * Connect to MongoDB
 */
const connectDB = async () => {
    try {
        mongoose_1.default.set('strictQuery', false);
        const conn = await mongoose_1.default.connect(index_1.default.db.url);
        logger_1.default.info(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    }
    catch (error) {
        logger_1.default.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
