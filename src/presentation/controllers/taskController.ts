import "reflect-metadata";
import { TaskApplicationService } from "../../application/taskApplication";
import { ControllerService } from "../services/controller-service";
import { container } from "../../infrastructure/container";

const taskApplicationService = container.resolve(TaskApplicationService);

interface TaskControllerI {
  // BASIC CRUD OPERATIONS
  createNewTask(req, res);
  getTask(req, res);
  updateTask(req, res);
  deleteTask(req, res);
}

// BASIC OPERATIONS:
// create payload. pass it on to application layer.
// handle the response later on

export class TaskController implements TaskControllerI {
  async createNewTask(req, res) {
    try {
      const task = await taskApplicationService.createNewTask(req);
      ControllerService.handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }

  async deleteTask(req, res) {
    try {
      const task = await taskApplicationService.deleteTask(req);
      ControllerService.handleTaskResponse(task, res);
    } catch (e) {
      ControllerService.handleError(e, res);
    }
  }

  async getTask(req, res) {
    try {
      const task = await taskApplicationService.getTask(req);
      ControllerService.handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }

  async getAllTasks(req, res) {
    try {
      const task = await taskApplicationService.getAllTasks(req);
      // ControllerService.handleResponseForTask(task, res);
      return res.send({ AllTasks: task });
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskApplicationService.updateTask(req);
      ControllerService.handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }
}
