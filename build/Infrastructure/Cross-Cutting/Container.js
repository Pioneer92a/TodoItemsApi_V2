"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const TaskRepository_1 = require("../Repository/TaskRepository");
const UserRepository_1 = require("../Repository/UserRepository");
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
tsyringe_1.container.register("UserRepositoryI", {
    useClass: UserRepository_1.UserRepository,
});
tsyringe_1.container.register("TaskRepositoryI", {
    useClass: TaskRepository_1.TaskRepository,
});
//# sourceMappingURL=Container.js.map