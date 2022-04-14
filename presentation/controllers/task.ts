import { TaskApplicationService } from "../../application/taskService";
import { ControllerService } from "../services/controller-service";
const taskApplicationService = new TaskApplicationService();

interface TaskControllersI {
  // BASIC CRUD OPERATIONS
  createNewTask(req, res);
  getTask(req, res);
  updateTask(req, res);
  deleteTask(req, res);
}

// BASIC OPERATIONS:
// create payload. pass it on to application layer.
// handle the response later on

export class TaskControllers implements TaskControllersI {
  async createNewTask(req, res) {
    try {
      const task = await taskApplicationService.createNewTask(req);
      ControllerService.handleResponseForTask(task, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }

  async deleteTask(req, res) {
    try {
      const task = await taskApplicationService.deleteTask(req);
      ControllerService.handleResponseForTask(task, res);
    } catch (e) {
      return res.status(400).send(e.message);
    }
  }

  async getTask(req, res) {
    try {
      const task = await taskApplicationService.getTask(req);
      ControllerService.handleResponseForTask(task, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }

  async getAllTasks(req, res) {
    try {
      const task = await taskApplicationService.getAllTasks(req);
      // ControllerService.handleResponseForTask(task, res);
      return res.send({ AllTasks: task });
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskApplicationService.updateTask(req);
      ControllerService.handleResponseForTask(task, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }
}
