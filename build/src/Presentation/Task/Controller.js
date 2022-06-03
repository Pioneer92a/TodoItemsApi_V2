"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
require("reflect-metadata");
const TaskApplication_1 = require("../../Application/Task/TaskApplication");
const TaskDTO_1 = require("../../Application/Task/TaskDTO");
const Container_1 = require("../../Infrastructure/Cross-Cutting/Container");
const ControllerServices_1 = require("../Services/ControllerServices");
const taskApplication = Container_1.container.resolve(TaskApplication_1.TaskApplication);
class TaskController {
    async addNewTask(req, res) {
        try {
            const addNewTaskDTO = new TaskDTO_1.AddNewTaskDTO(req.body.name, req.body.userUUID, req.body.dueDate);
            const task = await taskApplication.addNewTask(addNewTaskDTO);
            (0, ControllerServices_1.handleTaskResponse)(task, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async deleteTask(req, res) {
        try {
            const deleteTaskDTO = new TaskDTO_1.GeneralTaskDTO(req.params.id, req.body.userUUID);
            const task = await taskApplication.deleteTask(deleteTaskDTO);
            (0, ControllerServices_1.handleTaskResponse)(task, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async fetchTask(req, res) {
        try {
            const fetchTaskDTO = new TaskDTO_1.GeneralTaskDTO(req.params.id, req.body.userUUID);
            const task = await taskApplication.fetchTask(fetchTaskDTO);
            (0, ControllerServices_1.handleTaskResponse)(task, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async updateTask(req, res) {
        try {
            const updateTaskDTO = new TaskDTO_1.UpdateTaskDTO(req.params.id, req.body.userUUID, req.body.name, req.body.completed, req.body.dueDate);
            const task = await taskApplication.updateTask(updateTaskDTO);
            (0, ControllerServices_1.handleTaskResponse)(task, res);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
    async fetchAllTasks(req, res) {
        try {
            const fetchAllTasksDTO = new TaskDTO_1.FetchAllTasksDTO(req.query.page, req.query.perPage, req.body.userUUID);
            const tasks = await taskApplication.fetchAllTasks(fetchAllTasksDTO);
            return res.send(tasks);
        }
        catch (e) {
            (0, ControllerServices_1.handleError)(e, res);
        }
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=Controller.js.map