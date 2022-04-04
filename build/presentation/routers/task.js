"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const router = express.Router();
exports.router = router;
const taskControllers = require("../controllers/task");
router.post('/tasks', taskControllers.createNewTask);
//# sourceMappingURL=task.js.map