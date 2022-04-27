import "reflect-metadata";
import { TaskApplicationService } from "../../Application/TaskApplication";
import { container } from "../../Infrastructure/container";
import {
  handleTaskResponse,
  handleError,
  createTaskPayload,
  taskPayloadType,
} from "../Services/ControllerServices";

const taskApplicationService = container.resolve(TaskApplicationService);

/**
 * prepares input data for application layer and handles response
 */
export class TaskController {
  async createNewTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.createNewTask);
      const task = await taskApplicationService.createNewTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async deleteTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.generalPurpose);
      const task = await taskApplicationService.deleteTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async getTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.generalPurpose);
      const task = await taskApplicationService.getTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async getAllTasks(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.getAllTasks);
      const task = await taskApplicationService.getAllTasks(payload);
      //  handleResponseForTask(task, res);
      return res.send({ AllTasks: task });
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async updateTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.generalPurpose);
      const task = await taskApplicationService.updateTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }
}
