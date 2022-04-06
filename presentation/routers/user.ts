import * as express from "express";
import { UserControllers } from "../controllers/user";
import { auth } from "../middleware/auth";

const router = express.Router();
const userControllers = new UserControllers();

// route for Creating a new user
router.post("/users", userControllers.createNewUser);

// route for Reading a user
router.get("/users/", auth, userControllers.getUserDetails);

// route for Deleting a user
router.delete("/users/me", auth, userControllers.deleteUser);

// route for logging-in a user (jwt token is added to user in this case)
router.post("/users/login", userControllers.loginUser);

// route for logging-out a user (jwt token is deleted from user in this case)
router.post("/users/logout", auth, userControllers.logoutUser);

// route for updating a user 
router.post("/users/update", auth, userControllers.updateUser);

export { router };
