import * as express from "express";
import { userAuth } from "../Middleware/Auth";
import { UserController } from "./Controller";

const router = express.Router();
const userControllers = new UserController();

// route for logging-out a user
router.post("/logout", userAuth, userControllers.logoutUser);

// route for Reading a user
router.get("/user", userAuth, userControllers.fetchUser);

// route for Deleting a user
router.delete("/user/", userAuth, userControllers.deleteUser);

// note: some user endpoints are not included in router and are in main file

export { router };
