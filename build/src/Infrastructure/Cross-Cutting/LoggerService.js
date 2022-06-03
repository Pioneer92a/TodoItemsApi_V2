"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMidleware = exports.logger = void 0;
const express_pino_logger_1 = require("express-pino-logger");
const pino_1 = require("pino");
const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};
const logger = (0, pino_1.default)({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            levelFirst: true,
            translateTime: "yyyy-dd-mm, h:MM:ss TT",
        },
    },
    customLevels: levels,
    useOnlyCustomLevels: true,
    level: "http",
});
exports.logger = logger;
const loggerMidleware = (0, express_pino_logger_1.default)({
    logger: logger,
    autoLogging: false,
});
exports.loggerMidleware = loggerMidleware;
//# sourceMappingURL=LoggerService.js.map