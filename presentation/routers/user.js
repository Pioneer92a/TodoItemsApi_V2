"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var user_1 = require("../controllers/user");
var auth_1 = require("../middleware/auth");
var router = express.Router();
exports.router = router;
var userControllers = new user_1.UserControllers();
// route for Creating a new user
router.post("/users", userControllers.createNewUser);
// route for Reading a user
router.get("/users/", auth_1.auth, userControllers.getUserDetails);
// route for Deleting a user
router["delete"]("/users/me", auth_1.auth, userControllers.deleteUser);
// route for logging-in a user (jwt token is added to user in this case)
router.post("/users/login", userControllers.loginUser);
// route for logging-out a user (jwt token is deleted from user in this case)
router.post("/users/logout", auth_1.auth, userControllers.logoutUser);
// route for updating a user 
router.post("/users/update", auth_1.auth, userControllers.updateUser);
