"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const TaskApplication_1 = require("../../Application/Task/TaskApplication");
const TaskDTO_1 = require("../../Application/Task/TaskDTO");
const Container_1 = require("../../Infrastructure/Cross-Cutting/Container");
const common_1 = require("@nestjs/common");
const AuthServices_1 = require("../Services/AuthServices");
const taskApplication = Container_1.container.resolve(TaskApplication_1.TaskApplication);
let TaskController = class TaskController {
    async createTask(req) {
        const userUUID = req.body.uuid;
        const { name, dueDate } = req.body;
        const addNewTaskDTO = new TaskDTO_1.AddNewTaskDTO(name, userUUID, dueDate);
        return await taskApplication.addNewTask(addNewTaskDTO);
    }
    async fetchTask(req, taskID) {
        await AuthServices_1.default.throwErrorIfTaskDoesNotExist(taskID);
        const userUUID = req.body.uuid;
        const fetchTaskDTO = new TaskDTO_1.GeneralTaskDTO(taskID, userUUID);
        return await taskApplication.fetchTask(fetchTaskDTO);
    }
    async updateTask(req, taskID) {
        await AuthServices_1.default.throwErrorIfTaskDoesNotExist(Number(taskID));
        const userUUID = req.body.uuid;
        const { name, completed, dueDate } = req.body;
        const updateTaskDTO = new TaskDTO_1.UpdateTaskDTO(taskID, userUUID, name, completed, dueDate);
        return await taskApplication.updateTask(updateTaskDTO);
    }
    async deleteTask(req, taskID) {
        await AuthServices_1.default.throwErrorIfTaskDoesNotExist(Number(taskID));
        const userUUID = req.body.uuid;
        const deleteTaskDTO = new TaskDTO_1.GeneralTaskDTO(taskID, userUUID);
        return await taskApplication.deleteTask(deleteTaskDTO);
    }
    async fetchAllTasks(req, page, perPage) {
        const userUUID = req.body.uuid;
        const fetchAllTasksDTO = new TaskDTO_1.FetchAllTasksDTO(page, perPage, userUUID);
        return await taskApplication.fetchAllTasks(fetchAllTasksDTO);
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)("/fetch/:taskID"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("taskID", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "fetchTask", null);
__decorate([
    (0, common_1.Post)("/update/:taskID"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("taskID", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)("/delete/:taskID"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("taskID", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
__decorate([
    (0, common_1.Get)("/fetchAll"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("page", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)("perPage", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "fetchAllTasks", null);
TaskController = __decorate([
    (0, common_1.Controller)("task")
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map