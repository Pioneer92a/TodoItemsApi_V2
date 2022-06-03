"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_command_bus_1 = require("simple-command-bus");
class DeleteUserCommand extends simple_command_bus_1.Command {
    constructor(uuid) {
        super();
        this.uuid = uuid;
    }
}
exports.default = DeleteUserCommand;
//# sourceMappingURL=DeleteUserCommand.js.map