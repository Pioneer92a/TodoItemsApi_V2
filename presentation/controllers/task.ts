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
    const payload = ControllerService.createPayload(req);

    let task;
    try {
      task = await taskApplicationService.createNewTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponse(task, res);
  }

  async deleteTask(req, res) {
    const payload = ControllerService.createPayload(req);
    let task;
    try {
      task = await taskApplicationService.deleteTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponse(task, res);
  }

  async getTask(req, res) {
    const payload = ControllerService.createPayload(req);
    let task;
    try {
      task = await taskApplicationService.getTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponse(task, res);
  }

  async updateTask(req, res) {
    const payload = ControllerService.createPayload(req);

    let task;
    try {
      task = await taskApplicationService.updateTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponse(task, res);
  }
}
