"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFactory = void 0;
const Entity_1 = require("./Task/Entity");
const Entity_2 = require("./User/Entity");
class EntityFactory {
    static createUser(_uuid, _name, _email) {
        const _user = new Entity_2.UserEntity(_uuid, _name, _email);
        return _user;
    }
    static createTask(_uuid, _name, _userUUID, _dueDate) {
        const _task = new Entity_1.TaskEntity(_uuid, _name, _userUUID, _dueDate);
        return _task;
    }
}
exports.EntityFactory = EntityFactory;
//# sourceMappingURL=EntityFactory.js.map