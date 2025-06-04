"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Main server entry point
 */
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
const db_1 = __importDefault(require("./config/db"));
// Start server
app_1.default.listen(config_1.default.port, () => {
    logger_1.default.info(`Server running on port ${config_1.default.port}`);
    logger_1.default.info(`Environment: ${config_1.default.environment}`);
    (0, db_1.default)();
});
