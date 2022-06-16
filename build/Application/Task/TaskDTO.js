"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAllTasksDTO = exports.UpdateTaskDTO = exports.GeneralTaskDTO = exports.AddNewTaskDTO = void 0;
const zod_1 = require("zod");
const stringSchema = zod_1.z.string().min(1);
const numberSchema = zod_1.z.number().min(1);
const uuidSchema = zod_1.z.string().uuid();
class AddNewTaskDTO {
    constructor(name, userUUID, _dueDate) {
        this.name = name;
        this.userUUID = userUUID;
        this._dueDate = _dueDate;
        stringSchema.parse(name);
        this.dueDate = new Date(_dueDate);
    }
}
exports.AddNewTaskDTO = AddNewTaskDTO;
class GeneralTaskDTO {
    constructor(taskId, userUUID) {
        this.taskId = taskId;
        this.userUUID = userUUID;
        numberSchema.parse(taskId);
        uuidSchema.parse(userUUID);
    }
}
exports.GeneralTaskDTO = GeneralTaskDTO;
class UpdateTaskDTO {
    constructor(taskId, userUUID, name, completed, _dueDate) {
        this.taskId = taskId;
        this.userUUID = userUUID;
        this.name = name;
        this.completed = completed;
        this._dueDate = _dueDate;
        numberSchema.parse(taskId);
        uuidSchema.parse(userUUID);
        this.dueDate = new Date(_dueDate);
    }
}
exports.UpdateTaskDTO = UpdateTaskDTO;
class FetchAllTasksDTO {
    constructor(page, perPage, userUUID) {
        this.page = page;
        this.perPage = perPage;
        this.userUUID = userUUID;
        uuidSchema.parse(userUUID);
    }
}
exports.FetchAllTasksDTO = FetchAllTasksDTO;
//# sourceMappingURL=TaskDTO.js.map