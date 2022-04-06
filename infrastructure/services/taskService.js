"use strict";
exports.__esModule = true;
exports.TaskService = void 0;
var TaskService = /** @class */ (function () {
    function TaskService() {
    }
    TaskService.createTaskEntity = function (task) {
        var newTaskEntity = {
            name: task.name,
            uuid: task.uuid,
            userUUID: task.userId
        };
        return newTaskEntity;
    };
    return TaskService;
}());
exports.TaskService = TaskService;
