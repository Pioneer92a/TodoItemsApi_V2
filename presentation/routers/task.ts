import * as express from "express";

const router = express.Router();

import { auth, auth2 } from "../middleware/auth";
import { TaskControllers } from "../controllers/task";
const taskControllers = new TaskControllers();

router.get("/test", () => {
  console.log("hello");
});

// route for Creating a new task
// router.post('/task', auth, taskControllers.createNewTask);
router.post("/task", taskControllers.createNewTask);

// route for reading a task
// router.get('/task/:id', auth, taskControllers.getTask);
router.get("/task/:id", taskControllers.getTask);

// route for Deleting a task
// router.delete('/task/:id', auth, taskControllers.deleteTask);
router.delete("/task/:id", taskControllers.deleteTask);

// route for updating a task
// router.post('/task/update/:id', auth, taskControllers.updateTask);
router.post("/task/update/:id", taskControllers.updateTask);

export { router };
