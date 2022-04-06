"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var router = express.Router();
exports.router = router;
var auth_1 = require("../middleware/auth");
var task_1 = require("../controllers/task");
var taskControllers = new task_1.TaskControllers();
// route for Creating a new user
router.post('/task', auth_1.auth, taskControllers.createNewTask);
// route for Deleting a task
router["delete"]('/task/:id', auth_1.auth, taskControllers.deleteTask);
// route for reading a task
router.get('/task/:id', auth_1.auth, taskControllers.getTask);
// route for updating a task
router.post('/task/update/:id', auth_1.auth, taskControllers.updateTask);
