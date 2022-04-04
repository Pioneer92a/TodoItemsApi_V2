import * as express from 'express';

const router = express.Router();

// import {auth} from '../middleware/auth'; // import auth
import * as userControllers from '../controllers/user';
import { auth } from '../middleware/auth';

// route for Creating a new user
router.post('/users', userControllers.createNewUser);

// route for Reading a user
router.get('/users/', auth,  userControllers.getUserDetails);

// route for Deleting a user
router.delete('/users/me', auth, userControllers.deleteUser);

// route for logging-in a user (jwt token is added to user in this case)
router.post('/users/login', userControllers.loginUser);

// route for logging-out a user (jwt token is deleted from user in this case)
router.post('/users/logout', auth, userControllers.logoutUser);


export {router}
