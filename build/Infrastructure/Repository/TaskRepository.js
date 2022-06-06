"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const client_1 = require("@prisma/client");
const EntityFactory_1 = require("../../Domain/EntityFactory");
const prisma = new client_1.PrismaClient();
class TaskRepository {
    async addNewTask(newTask) {
        try {
            const _dueDate = new Date();
            _dueDate.setDate(_dueDate.getDate() + 14);
            const newTaskCreated = await prisma.task.create({
                data: {
                    uuid: newTask.uuid,
                    name: newTask.name,
                    dueDate: newTask.dueDate,
                    user: {
                        connectOrCreate: {
                            where: {
                                uuid: newTask.userUUID,
                            },
                            create: {
                                email: "UserNotFound@prisma.io",
                                name: "UserNotFound",
                                uuid: "UserNotFound",
                                isLoggedIn: true,
                            },
                        },
                    },
                },
                include: {
                    user: true,
                },
            });
            return EntityFactory_1.EntityFactory.createTask(newTaskCreated.uuid, newTaskCreated.name, newTaskCreated.user.uuid, newTaskCreated.dueDate);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async deleteTask(taskId) {
        try {
            const deletedTask = await prisma.task.delete({
                where: {
                    id: taskId,
                },
                include: {
                    user: true,
                },
            });
            if (!deletedTask)
                return null;
            else
                return EntityFactory_1.EntityFactory.createTask(deletedTask.uuid, deletedTask.name, deletedTask.user.uuid, deletedTask.dueDate);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async fetchTask(taskId) {
        try {
            const getTask = await prisma.task.findUnique({
                where: {
                    id: taskId,
                },
                include: {
                    user: true,
                },
            });
            return EntityFactory_1.EntityFactory.createTask(getTask.uuid, getTask.name, getTask.user.uuid, getTask.dueDate);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async updateTask(taskId, updatedName, _completed, _dueDate) {
        try {
            const updateTask = await prisma.task.update({
                where: {
                    id: taskId,
                },
                data: {
                    name: updatedName,
                    completed: _completed,
                    dueDate: _dueDate,
                },
                include: {
                    user: true,
                },
            });
            return EntityFactory_1.EntityFactory.createTask(updateTask.uuid, updateTask.name, updateTask.user.uuid, updateTask.dueDate);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async fetchAllTasks(page, perPage) {
        const fetchAllTasks = await prisma.task.findMany({
            skip: page - 1,
            take: perPage,
            include: {
                user: true,
            },
        });
        const fetchAllTasksEdited = [];
        fetchAllTasks.forEach((task, index) => {
            fetchAllTasksEdited[index] = EntityFactory_1.EntityFactory.createTask(task.uuid, task.name, task.user.uuid, task.dueDate);
        });
        return fetchAllTasksEdited;
    }
    async fetchTotalTasks() {
        const totalTasks = await prisma.task.count();
        return totalTasks;
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=TaskRepository.js.map