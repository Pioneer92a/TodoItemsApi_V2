"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserApplication_1 = require("../../../../Application/User/UserApplication");
const tsyringe_1 = require("tsyringe");
const userApplication = tsyringe_1.container.resolve(UserApplication_1.UserApplication);
class DeleteUserHandler {
    async handle(command) {
        return await userApplication.deleteUser(command);
    }
}
exports.default = DeleteUserHandler;
//# sourceMappingURL=DeleteUserHandler.js.map