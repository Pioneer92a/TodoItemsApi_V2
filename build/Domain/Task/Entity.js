"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
const BaseEntity_1 = require("../BaseEntity");
class TaskEntity extends BaseEntity_1.BaseEntity {
    constructor(uuid, name, userUUID, dueDate) {
        super(uuid, name);
        this.userUUID = userUUID;
        this.dueDate = dueDate;
        this.guardAgainst140WordsLongName(name);
    }
    guardAgainst140WordsLongName(name) {
        if (name.length < 140)
            return true;
        else
            throw new Error("name of task too long");
    }
}
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=Entity.js.map