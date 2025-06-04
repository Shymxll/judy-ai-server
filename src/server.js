/**
 * Main server entry point
 */
const app = require('./app');
const config = require('./config');

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.environment}`);
});