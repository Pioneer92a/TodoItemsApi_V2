"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require("express");
const Auth_1 = require("../Middleware/Auth");
const Controller_1 = require("./Controller");
const router = express.Router();
exports.router = router;
const userControllers = new Controller_1.UserController();
router.post("/logout", Auth_1.userAuth, userControllers.logoutUser);
router.get("/user", Auth_1.userAuth, userControllers.fetchUser);
router.delete("/user/", Auth_1.userAuth, userControllers.deleteUser);
//# sourceMappingURL=Router.js.map