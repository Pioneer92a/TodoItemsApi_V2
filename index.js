"use strict";
exports.__esModule = true;
var express = require("express"); // import express server
// import routers
var user_1 = require("./presentation/routers/user"); // import user router
var task_1 = require("./presentation/routers/task"); // import tasks router
// import port configuration
var config_1 = require("./infrastructure/config");
/* Defining app to be an express app and the port to use */
var app = express();
app.use(express.json());
// define app routers
app.use(user_1.router);
app.use(task_1.router);
// start the server/app
app.listen(config_1.port, function () {
    console.log("Server is up at ".concat(config_1.port));
});
