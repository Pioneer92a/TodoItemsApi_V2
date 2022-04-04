"use strict";
exports.__esModule = true;
exports.JWT_SECRET = exports.port = void 0;
var dotenv = require("dotenv");
dotenv.config();
var port = process.env.PORT;
exports.port = port;
// const mongodb_URL = process.env.mongodb_URL
var JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
// module.exports = {
//   port: process.env.PORT,
//   mongodb_URL: process.env.mongodb_URL,
//   JWT_SECRET: process.env.JWT_SECRET,
// };
