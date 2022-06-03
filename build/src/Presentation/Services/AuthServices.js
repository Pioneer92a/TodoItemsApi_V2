"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const Config_1 = require("../../Infrastructure/Cross-Cutting/Config");
const TaskRepository_1 = require("../../Infrastructure/Repository/TaskRepository");
const UserRepository_1 = require("../../Infrastructure/Repository/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const taskRepository = new TaskRepository_1.TaskRepository();
class AuthServices {
    static decodeUUIDFromHeader(req) {
        const token = req.header("Authorization").replace("Bearer ", "");
        return jwt.verify(token, Config_1.JWT_SECRET);
    }
    static throwErrorIfNoUUID(uuid) {
        if (!uuid)
            throw new Error(`request body doesn't contain userUUID info`);
    }
    static async throwErrorIfUserDoesNotExist(uuid) {
        const user = await userRepository.fetchUserbyUUID(uuid);
        if (!user)
            throw new Error("user not found");
    }
    static async throwErrorIfUserNotLoggedIn(uuid) {
        const isLoggedIn = await userRepository.fetchUserLoginStatus(uuid);
        if (!isLoggedIn)
            throw new Error("user not logged in");
    }
    static async throwErrorIfTaskDoesNotExist(taskId) {
        const task = await taskRepository.fetchTask(taskId);
        if (!task)
            throw new Error("the task does not exist");
    }
}
exports.default = AuthServices;
//# sourceMappingURL=AuthServices.js.map