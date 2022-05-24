import * as express from "express";
import { taskAuth } from "../Middleware/Auth";
import { TaskController } from "./Controller";

const router = express.Router();

const taskControllers = new TaskController();

// route for Creating a new task
router.post("/newtask", taskAuth, taskControllers.addNewTask);

// route for reading a task
router.get("/task/:id", taskAuth, taskControllers.fetchTask);

// route for Deleting a task
router.delete("/task/:id", taskAuth, taskControllers.deleteTask);

// route for updating a task
router.post("/task/update/:id", taskAuth, taskControllers.updateTask);

// // route for reading a task
// router.get(
//   "/task/getAll/:start/:limit",
//   taskAuth,
//   taskControllers.fetchAllTasks
// );

// route for reading a task
// router.get("/task/getAll", taskAuth, taskControllers.fetchAllTasks);
router.get("/getAllTasks", taskAuth, taskControllers.fetchAllTasks);

export { router };
