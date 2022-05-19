import "reflect-metadata";
import { TaskApplication } from "../../Application/Task/TaskApplication";
import {
  AddNewTaskDTO,
  FetchAllTasksDTO,
  GeneralTaskDTO,
  UpdateTaskDTO,
} from "../../Application/Task/TaskDTO";
import { container } from "../../Infrastructure/Cross-Cutting/Container";
import {
  handleError,
  handleTaskResponse,
} from "../Services/ControllerServices";

const taskApplication = container.resolve(TaskApplication);

/**
 * prepares input data for application layer and handles response
 */
export class TaskController {
  async addNewTask(req, res) {
    try {
      const addNewTaskDTO = new AddNewTaskDTO(req.body.name, req.body.userUUID);
      const task = await taskApplication.addNewTask(addNewTaskDTO);
      handleTaskResponse(task, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async deleteTask(req, res) {
    try {
      const deleteTaskDTO = new GeneralTaskDTO(
        req.params.id,
        req.body.userUUID
      );
      const task = await taskApplication.deleteTask(deleteTaskDTO);
      handleTaskResponse(task, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async fetchTask(req, res) {
    try {
      const fetchTaskDTO = new GeneralTaskDTO(req.params.id, req.body.userUUID);
      const task = await taskApplication.fetchTask(fetchTaskDTO);
      handleTaskResponse(task, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async updateTask(req, res) {
    try {
      const updateTaskDTO = new UpdateTaskDTO(
        req.params.id,
        req.body.userUUID,
        req.body.name,
        req.body.completed
      );
      const task = await taskApplication.updateTask(updateTaskDTO);
      handleTaskResponse(task, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async fetchAllTasks(req, res) {
    try {
      const fetchAllTasksDTO = new FetchAllTasksDTO(
        req.params.page,
        req.body.userUUID
      );
      const task = await taskApplication.fetchAllTasks(fetchAllTasksDTO);
      //  handleResponseForTask(task, res);
      return res.send({ AllTasks: task });
    } catch (e) {
      handleError(e, res);
    }
  }
}
