"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_command_bus_1 = require("simple-command-bus");
const DeleteUserHandler_1 = require("./Handlers/DeleteUserHandler");
const FetchUserHandler_1 = require("./Handlers/FetchUserHandler");
const FindOrAddUserHandler_1 = require("./Handlers/FindOrAddUserHandler");
const LogoutUserHandler_1 = require("./Handlers/LogoutUserHandler");
const commandHandlerMiddleware = new simple_command_bus_1.CommandHandlerMiddleware(new simple_command_bus_1.ClassNameExtractor(), new simple_command_bus_1.InMemoryLocator({
    FetchUserHandler: new FetchUserHandler_1.default(),
    LogoutUserHandler: new LogoutUserHandler_1.default(),
    DeleteUserHandler: new DeleteUserHandler_1.default(),
    FindOrAddUserHandler: new FindOrAddUserHandler_1.default(),
}), new simple_command_bus_1.HandleInflector());
exports.default = commandHandlerMiddleware;
//# sourceMappingURL=CommandHandlerMiddleware.js.map