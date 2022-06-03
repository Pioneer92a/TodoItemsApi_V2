"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const simple_command_bus_1 = require("simple-command-bus");
const UserDTO_1 = require("../../Application/User/UserDTO");
const CommandHandlerMiddleware_1 = require("../../Infrastructure/CommandBus/User/CommandHandlerMiddleware");
const DeleteUserCommand_1 = require("../../Infrastructure/CommandBus/User/Commands/DeleteUserCommand");
const FetchUserCommand_1 = require("../../Infrastructure/CommandBus/User/Commands/FetchUserCommand");
const FindOrAddUserCommand_1 = require("../../Infrastructure/CommandBus/User/Commands/FindOrAddUserCommand");
const LogoutUserCommand_1 = require("../../Infrastructure/CommandBus/User/Commands/LogoutUserCommand");
const ControllerServices_1 = require("../Services/ControllerServices");
const commandBus = new simple_command_bus_1.CommandBus([CommandHandlerMiddleware_1.default]);
class UserController {
    async findOrAddUser(req, res) {
        try {
            const { name, email } = new UserDTO_1.FindOrAddUserDTO(req);
            const command = new FindOrAddUserCommand_1.default(name, email);
            const user = await commandBus.handle(command);
            (0, ControllerServices_1.handleUserResponse)(user, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async logoutUser(req, res) {
        try {
            const { uuid } = new UserDTO_1.GeneralUserDTO(req);
            const command = new LogoutUserCommand_1.default(uuid);
            const user = await commandBus.handle(command);
            (0, ControllerServices_1.handleUserResponse)(user, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async fetchUser(req, res) {
        try {
            const { uuid } = new UserDTO_1.GeneralUserDTO(req);
            const command = new FetchUserCommand_1.default(uuid);
            const user = await commandBus.handle(command);
            (0, ControllerServices_1.handleUserResponse)(user, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async deleteUser(req, res) {
        try {
            const { uuid } = new UserDTO_1.GeneralUserDTO(req);
            const command = new DeleteUserCommand_1.default(uuid);
            const user = await commandBus.handle(command);
            (0, ControllerServices_1.handleUserResponse)(user, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=Controller.js.map