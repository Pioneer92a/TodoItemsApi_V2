"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAllTasksDTO = exports.UpdateTaskDTO = exports.GeneralTaskDTO = exports.AddNewTaskDTO = void 0;
class AddNewTaskDTO {
    constructor(_name, _userUUID, _dueDate) {
        throwErrorIfNoName(_name);
        this.name = _name;
        this.userUUID = _userUUID;
        this.dueDate = new Date(_dueDate);
    }
}
exports.AddNewTaskDTO = AddNewTaskDTO;
class GeneralTaskDTO {
    constructor(_taskId, _userUUID) {
        throwErrorIfNoId(_taskId);
        throwErrorIfNoUserUUID(_userUUID);
        this.taskId = parseInt(_taskId);
        this.userUUID = _userUUID;
    }
}
exports.GeneralTaskDTO = GeneralTaskDTO;
class UpdateTaskDTO {
    constructor(_taskId, _userUUID, _name, _completed, _dueDate) {
        throwErrorIfNoId(_taskId);
        throwErrorIfNoUserUUID(_userUUID);
        this.taskId = parseInt(_taskId);
        this.userUUID = _userUUID;
        this.name = _name;
        this.completed = _completed;
        this.dueDate = new Date(_dueDate);
    }
}
exports.UpdateTaskDTO = UpdateTaskDTO;
class FetchAllTasksDTO {
    constructor(page, perPage, _userUUID) {
        throwErrorIfNoUserUUID(_userUUID);
        this.page = parseInt(page);
        this.perPage = parseInt(perPage);
        this.userUUID = _userUUID;
    }
}
exports.FetchAllTasksDTO = FetchAllTasksDTO;
function throwErrorIfNoName(arg) {
    if (!arg)
        throw new Error("name not sent with the request body");
}
function throwErrorIfNoUserUUID(arg) {
    if (!arg)
        throw new Error("user UUID not sent with the request body");
}
function throwErrorIfNoId(arg) {
    if (!arg)
        throw new Error("user UUID not sent with the request body");
}
function throwErrorIfNoOffsetDetails(arg) {
    if (!arg)
        throw new Error("user UUID not sent with the request body");
}
//# sourceMappingURL=TaskDTO.js.map