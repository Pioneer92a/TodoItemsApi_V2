"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const Auth_1 = require("../Middleware/Auth");
const Controller_1 = require("./Controller");
const router = express.Router();
exports.router = router;
const taskControllers = new Controller_1.TaskController();
router.post("/newtask", Auth_1.taskAuth, taskControllers.addNewTask);
router.get("/task/:id", Auth_1.taskAuth, taskControllers.fetchTask);
router.delete("/task/:id", Auth_1.taskAuth, taskControllers.deleteTask);
router.post("/task/update/:id", Auth_1.taskAuth, taskControllers.updateTask);
router.get("/getAllTasks", Auth_1.taskAuth, taskControllers.fetchAllTasks);
//# sourceMappingURL=Router.js.map