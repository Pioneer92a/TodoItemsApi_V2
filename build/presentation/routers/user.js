"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const router = express.Router();
exports.router = router;
const userControllers = require("../controllers/user");
router.post('/users', userControllers.createNewUser);
//# sourceMappingURL=user.js.map