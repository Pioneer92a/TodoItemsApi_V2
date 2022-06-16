"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const Config_1 = require("../../Infrastructure/Cross-Cutting/Config");
const TaskRepository_1 = require("../../Infrastructure/Repository/TaskRepository");
const UserRepository_1 = require("../../Infrastructure/Repository/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const taskRepository = new TaskRepository_1.TaskRepository();
class AuthServices {
    static decodeUUIDFromHeader(req) {
        let token = req.header("Authorization");
        AuthServices.throwErrorIfNoUUID(token);
        token = token.replace("Bearer ", "");
        return jwt.verify(token, Config_1.JWT_SECRET);
    }
    static throwErrorIfNoUUID(uuid) {
        if (!uuid)
            throw new common_1.HttpException(`request body doesn't contain userUUID info`, common_1.HttpStatus.BAD_REQUEST);
    }
    static async throwErrorIfUserDoesNotExist(uuid) {
        const user = await userRepository.fetchUserbyUUID(uuid);
        if (!user)
            if (!uuid)
                throw new common_1.HttpException(`user not found`, common_1.HttpStatus.NOT_FOUND);
    }
    static async throwErrorIfUserNotLoggedIn(uuid) {
        const isLoggedIn = await userRepository.fetchUserLoginStatus(uuid);
        if (!isLoggedIn)
            throw new common_1.HttpException(`user not logged in`, common_1.HttpStatus.UNAUTHORIZED);
    }
    static async throwErrorIfTaskDoesNotExist(taskId) {
        const task = await taskRepository.fetchTask(taskId);
        if (!task)
            throw new common_1.HttpException(`task not found`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.default = AuthServices;
//# sourceMappingURL=AuthServices.js.map