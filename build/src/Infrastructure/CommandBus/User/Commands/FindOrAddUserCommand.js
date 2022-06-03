"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_command_bus_1 = require("simple-command-bus");
class FindOrAddUserCommand extends simple_command_bus_1.Command {
    constructor(name, email) {
        super();
        this.name = name;
        this.email = email;
    }
}
exports.default = FindOrAddUserCommand;
//# sourceMappingURL=FindOrAddUserCommand.js.map