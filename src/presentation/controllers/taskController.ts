import "reflect-metadata";
import { TaskApplication } from "../../Application/TaskApplication";
import { container } from "../../Infrastructure/Container";
import {
  handleTaskResponse,
  handleError,
  createTaskPayload,
  taskPayloadType,
} from "../Services/ControllerServices";

const taskApplication = container.resolve(TaskApplication);

/**
 * prepares input data for application layer and handles response
 */
export class TaskController {
  async addNewTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.createNewTask);
      const task = await taskApplication.addNewTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async deleteTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.generalPurpose);
      const task = await taskApplication.deleteTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async fetchTask(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.generalPurpose);
      const task = await taskApplication.fetchTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async fetchAllTasks(req, res) {
    try {
      const payload = createTaskPayload(req, taskPayloadType.getAllTasks);
      const task = await taskApplication.fetchAllTasks(payload);
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
      const task = await taskApplication.updateTask(payload);
      handleTaskResponse(task, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }
}
