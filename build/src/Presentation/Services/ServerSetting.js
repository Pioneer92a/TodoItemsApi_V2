"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const LoggerService_1 = require("../../Infrastructure/Cross-Cutting/LoggerService");
const Auth_1 = require("../Middleware/Auth");
const PassportService_1 = require("./PassportService");
const Router_1 = require("../Task/Router");
const Controller_1 = require("../User/Controller");
const Router_2 = require("../User/Router");
const cookieSession = require("cookie-session");
const userControllers = new Controller_1.UserController();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    LoggerService_1.logger.info("you are not logged in");
    res.send("you are not logged in");
});
app.get("/failed", (req, res) => {
    LoggerService_1.logger.error("you failed to login");
    res.send("you failed to login");
});
app.use(cookieSession({
    name: "todo-session",
    keys: ["key1", "key2"],
}));
app.use(PassportService_1.passport.initialize());
app.use(PassportService_1.passport.session());
app.use(Router_1.router);
app.use(Router_2.router);
app.use(LoggerService_1.loggerMidleware);
app.get("/login", (req, res, next) => {
    LoggerService_1.logger.info("login route accessed");
    next();
}, PassportService_1.passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/logout", (req, res) => {
    LoggerService_1.logger.info("logout route accessed");
    req.session = null;
    req.logout();
    res.redirect("/");
});
app.get("/google/callback", PassportService_1.passport.authenticate("google", { failureRedirect: "/failed" }), function (req, res) {
    res.redirect("/good");
});
app.get("/good", Auth_1.isLoggedInCb, userControllers.findOrAddUser);
exports.default = app;
//# sourceMappingURL=ServerSetting.js.map