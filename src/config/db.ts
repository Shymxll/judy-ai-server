/**
 * Database connection configuration
 */
import mongoose from 'mongoose';
import config from './index';
import logger from '../utils/logger';

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(config.db.url);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error: any) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;