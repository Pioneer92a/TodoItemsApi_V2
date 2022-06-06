"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
class TaskEntity {
    constructor(_uuid, _name, _userUUID, _dueDate) {
        this.guardAgainst140WordsLongName(_name);
        this.uuid = _uuid;
        this.name = _name;
        this.userUUID = _userUUID;
        this.dueDate = _dueDate;
    }
    guardAgainst140WordsLongName(_name) {
        return true;
    }
}
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=Entity.js.map