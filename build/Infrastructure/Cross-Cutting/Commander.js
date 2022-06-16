"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portNumber = void 0;
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .option("-d, --debug", "output extra debugging", false)
    .option("-p, --port-number [type]", "specify port for express server")
    .parse();
const options = program.opts();
if (options.debug)
    console.log(options);
let portNumber;
exports.portNumber = portNumber;
if (options.portNumber) {
    exports.portNumber = portNumber = options.portNumber === true ? "3000" : options.portNumber;
}
//# sourceMappingURL=Commander.js.map