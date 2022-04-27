import * as express from "express";

const router = express.Router();

import { taskAuth } from "../Middleware/Auth";
import { TaskController } from "../Controllers/TaskController";
const taskControllers = new TaskController();

// route for Creating a new task
router.post("/task", taskAuth, taskControllers.createNewTask);

// route for reading a task
router.get("/task/:id", taskAuth, taskControllers.getTask);

// route for Deleting a task
router.delete("/task/:id", taskAuth, taskControllers.deleteTask);

// route for updating a task
router.post("/task/update/:id", taskAuth, taskControllers.updateTask);

// route for reading a task
router.get("/task/getAll/:page", taskAuth, taskControllers.getAllTasks);

export { router };
