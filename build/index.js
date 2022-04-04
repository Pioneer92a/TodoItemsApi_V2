"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_1 = require("./presentation/routers/user");
const task_1 = require("./presentation/routers/task");
const app = express();
const config_1 = require("./infrastructure/config");
app.use(express.json());
app.use(user_1.router);
app.use(task_1.router);
app.listen(config_1.port, () => {
    console.log(`Server is up at ${config_1.port}`);
});
//# sourceMappingURL=index.js.map