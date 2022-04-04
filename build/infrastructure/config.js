"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.port = void 0;
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
exports.port = port;
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
//# sourceMappingURL=config.js.map