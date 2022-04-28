import "reflect-metadata";
import { autoInjectable } from "tsyringe";
import { TaskEntity } from "../Domain/Entity/Task";
import { TaskDomain } from "../Domain/TaskDomain";
import { UserDomain } from "../Domain/UserDomain";
import { validateUser, validateTask } from "./ApplicationServices";
import {
  createNewTaskDTO,
  getAllTasksDTO,
  taskDTOforRUD,
} from "./DTOs/TaskDTO";

/**
 * performs some application level checks on input before passing it on to Domain Layer
 */
@autoInjectable()
export class TaskApplicationService {
  taskDomain: TaskDomain;
  userDomain: UserDomain;
  constructor(taskDomain: TaskDomain, userDomain: UserDomain) {
    this.taskDomain = taskDomain;
    this.userDomain = userDomain;
  }
  /**
   * create a new Task
   */
  async createNewTask(payload): Promise<TaskEntity> {
    const taskEntity = createNewTaskDTO(payload); // create TaskEntity if possible
    await validateUser(taskEntity.userUUID, this.userDomain); // validate if user exists and is logged in
    return await this.taskDomain.createNewTask(taskEntity); // send the entity to domain and return the response
  }

  async deleteTask(payload): Promise<TaskEntity> {
    const deleteTask = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userDomain);
    await validateTask(deleteTask, this.taskDomain);
    return await this.taskDomain.deleteTask(parseInt(deleteTask.taskId));
  }

  async getTask(payload): Promise<TaskEntity> {
    const getTask = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userDomain);
    return await this.taskDomain.getTask(parseInt(getTask.taskId));
  }

  async updateTask(payload): Promise<TaskEntity> {
    const updateTask = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userDomain);
    await validateTask(updateTask, this.taskDomain);
    return await this.taskDomain.updateTask(parseInt(updateTask.taskId));
  }

  async getAllTasks(payload): Promise<TaskEntity[]> {
    const getAllTasks = getAllTasksDTO(payload);
    await validateUser(payload.userUUID, this.userDomain);
    return await this.taskDomain.getAllTasks(parseInt(getAllTasks.page));
  }
}
