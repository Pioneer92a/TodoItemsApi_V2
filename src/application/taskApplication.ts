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
export class TaskApplication {
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
    const taskDTO = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userDomain);
    await validateTask(taskDTO, this.taskDomain);
    return await this.taskDomain.deleteTask(parseInt(taskDTO.taskId));
  }

  async getTask(payload): Promise<TaskEntity> {
    const taskDTO = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userDomain);
    await validateTask(taskDTO, this.taskDomain);
    return await this.taskDomain.getTask(parseInt(taskDTO.taskId));
  }

  async updateTask(payload): Promise<TaskEntity> {
    const taskDTO = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userDomain);
    await validateTask(taskDTO, this.taskDomain);
    return await this.taskDomain.updateTask(parseInt(taskDTO.taskId));
  }

  async getAllTasks(payload): Promise<TaskEntity[]> {
    const taskDTO = getAllTasksDTO(payload);
    await validateUser(payload.userUUID, this.userDomain);
    return await this.taskDomain.getAllTasks(parseInt(taskDTO.page));
  }
}
