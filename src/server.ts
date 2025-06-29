/**
 * Main server entry point
 */
import app from './app';
import appConfig from './config';
import logger from './utils/logger';
import connectDB from './config/db';
// Start server
app.listen(appConfig.port, () => {
  logger.info(`Server running on port ${appConfig.port}`);
  logger.info(`Environment: ${appConfig.environment}`);
  connectDB();
});