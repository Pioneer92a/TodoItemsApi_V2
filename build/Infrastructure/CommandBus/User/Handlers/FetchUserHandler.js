"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserApplication_1 = require("../../../../Application/User/UserApplication");
const tsyringe_1 = require("tsyringe");
const userApplication = tsyringe_1.container.resolve(UserApplication_1.UserApplication);
class FetchUserHandler {
    async handle(command) {
        return await userApplication.fetchUserbyUUID(command);
    }
}
exports.default = FetchUserHandler;
//# sourceMappingURL=FetchUserHandler.js.map