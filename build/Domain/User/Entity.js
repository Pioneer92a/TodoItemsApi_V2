"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const BaseEntity_1 = require("../BaseEntity");
class UserEntity extends BaseEntity_1.BaseEntity {
    constructor(uuid, name, email) {
        super(uuid, name);
        this.email = email;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=Entity.js.map