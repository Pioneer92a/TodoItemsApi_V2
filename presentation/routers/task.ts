import * as express from 'express';

const router = express.Router();

import { auth } from '../middleware/auth';
import { TaskControllers } from "../controllers/task";
const taskControllers = new TaskControllers()

// route for Creating a new user
router.post('/task', auth, taskControllers.createNewTask);

// route for Deleting a task
router.delete('/task/:id', auth, taskControllers.deleteTask);

// route for reading a task
router.get('/task/:id', auth, taskControllers.getTask);

// route for updating a task
router.post('/task/update/:id', auth, taskControllers.updateTask);

export {router}