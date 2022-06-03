"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUsername = exports.createUser = void 0;
const client_1 = require("./client");
async function createUser(user) {
    return await client_1.default.user.create({
        data: user,
    });
}
exports.createUser = createUser;
async function updateUsername(user) {
    return await client_1.default.user.update({
        where: { id: user.id },
        data: user,
    });
}
exports.updateUsername = updateUsername;
//# sourceMappingURL=functions-without-context.js.map