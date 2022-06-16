"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginOrAddUserDTO = exports.GeneralUserDTO = void 0;
const zod_1 = require("zod");
const stringSchema = zod_1.z.string().min(1);
const uuidSchema = zod_1.z.string().uuid();
const emailSchema = zod_1.z.string().email();
class GeneralUserDTO {
    constructor(uuid) {
        this.uuid = uuid;
        uuidSchema.parse(uuid);
    }
}
exports.GeneralUserDTO = GeneralUserDTO;
class LoginOrAddUserDTO {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        stringSchema.parse(name);
        emailSchema.parse(email);
    }
}
exports.LoginOrAddUserDTO = LoginOrAddUserDTO;
//# sourceMappingURL=UserDTO.js.map