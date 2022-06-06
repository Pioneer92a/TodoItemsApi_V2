"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginOrAddUserDTO = exports.FindOrAddUserDTO = exports.GeneralUserDTO = void 0;
class GeneralUserDTO {
    constructor(uuid) {
        this.uuid = uuid;
        throwErrorIfNoUUID(this.uuid);
    }
}
exports.GeneralUserDTO = GeneralUserDTO;
class FindOrAddUserDTO {
    constructor(req) {
        this.name = req.user.name.givenName;
        this.email = req.user.emails[0].value;
        throwErrorIfNoName(this.name);
        throwErrorIfNoEmail(this.email);
    }
}
exports.FindOrAddUserDTO = FindOrAddUserDTO;
class LoginOrAddUserDTO {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        throwErrorIfNoName(this.name);
        throwErrorIfNoEmail(this.email);
    }
}
exports.LoginOrAddUserDTO = LoginOrAddUserDTO;
function throwErrorIfNoName(arg) {
    if (!arg)
        throw new Error("user request does not have uuid");
}
function throwErrorIfNoEmail(arg) {
    if (!arg)
        throw new Error("user request does not have uuid");
}
function throwErrorIfNoUUID(arg) {
    if (!arg)
        throw new Error("user request does not have uuid");
}
//# sourceMappingURL=UserDTO.js.map