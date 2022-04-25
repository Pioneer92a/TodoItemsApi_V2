import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { task } from "../domain/model/task";
import { TaskDomainI } from "../infrastructure/interfaces/domainInterfaces/taskDomainI";
import {
  createNewTaskDTO,
  getAllTasksDTO,
  taskDTOforRUD,
} from "./DTOs/taskDTO";

@autoInjectable()
export class TaskApplicationService {
  taskDomain: TaskDomainI;
  constructor(@inject("TaskDomainI") taskDomain: TaskDomainI) {
    this.taskDomain = taskDomain;
  }
  /**
   * create a new task
   */
  async createNewTask(req): Promise<task> {
    const taskEntity = createNewTaskDTO(req);

    return await this.taskDomain.createNewTask(taskEntity);
  }

  async deleteTask(req): Promise<task> {
    const deleteTask = taskDTOforRUD(req);
    return await this.taskDomain.deleteTask(deleteTask);
  }

  async getTask(req): Promise<task> {
    const getTask = taskDTOforRUD(req);
    return await this.taskDomain.getTask(getTask);
  }

  async getAllTasks(req): Promise<task[]> {
    const getAllTasks = getAllTasksDTO(req);
    return await this.taskDomain.getAllTasks(getAllTasks);
  }

  async updateTask(req): Promise<task> {
    const updateTask = taskDTOforRUD(req);
    return await this.taskDomain.updateTask(updateTask);
  }
}
