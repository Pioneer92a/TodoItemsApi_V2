import * as express from 'express';

const router = express.Router();

import * as taskControllers from '../controllers/task';
import { auth } from '../middleware/auth';

// route for Creating a new user
router.post('/task', auth, taskControllers.createNewTask);

// route for Deleting a task
router.delete('/task/:id', auth, taskControllers.deleteTask);

// route for reading a task
router.get('/task/:id', auth, taskControllers.getTask);

export {router}