"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOrAddUserDTO = exports.GeneralUserDTO = void 0;
class GeneralUserDTO {
    constructor(req) {
        this.uuid = req.params.uuid;
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