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
exports.TaskApplication = void 0;
const PaginatedData_1 = require("../Pagination/PaginatedData");
const PaginationOptions_1 = require("../Pagination/PaginationOptions");
const EntityFactory_1 = require("../../Domain/EntityFactory");
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const uuid_1 = require("uuid");
let TaskApplication = class TaskApplication {
    constructor(userRepository, taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }
    async addNewTask(payload) {
        const taskEntity = EntityFactory_1.EntityFactory.createTask((0, uuid_1.v1)(), payload.name, payload.userUUID, payload.dueDate);
        return await this.taskRepository.addNewTask(taskEntity);
    }
    async deleteTask(payload) {
        return await this.taskRepository.deleteTask(payload.taskId);
    }
    async fetchTask(payload) {
        return await this.taskRepository.fetchTask(payload.taskId);
    }
    async updateTask(payload) {
        return await this.taskRepository.updateTask(payload.taskId, payload.name, payload.completed, payload.dueDate);
    }
    async fetchAllTasks(payload) {
        const totalTasks = await this.taskRepository.fetchTotalTasks();
        const paginationOptions = new PaginationOptions_1.default(payload.page, payload.perPage, totalTasks);
        const selectedTasks = await this.taskRepository.fetchAllTasks(paginationOptions.getOffset(), paginationOptions.perPage);
        return new PaginatedData_1.default(paginationOptions, selectedTasks);
    }
};
TaskApplication = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepositoryI")),
    __param(1, (0, tsyringe_1.inject)("TaskRepositoryI")),
    __metadata("design:paramtypes", [Object, Object])
], TaskApplication);
exports.TaskApplication = TaskApplication;
//# sourceMappingURL=TaskApplication.js.map