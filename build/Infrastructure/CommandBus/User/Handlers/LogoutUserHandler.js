"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserApplication_1 = require("../../../../Application/User/UserApplication");
const tsyringe_1 = require("tsyringe");
const userApplication = tsyringe_1.container.resolve(UserApplication_1.UserApplication);
class LogoutUserHandler {
    async handle(command) {
        return await userApplication.logoutUser(command);
    }
}
exports.default = LogoutUserHandler;
//# sourceMappingURL=LogoutUserHandler.js.map