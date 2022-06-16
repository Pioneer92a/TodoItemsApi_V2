import PaginatedData from "@app/Pagination/PaginatedData";
import PaginationOptions from "@app/Pagination/PaginationOptions";
import {
  AddNewTaskDTO,
  FetchAllTasksDTO,
  GeneralTaskDTO,
  UpdateTaskDTO,
} from "@app/Task/TaskDTO";
import { EntityFactory } from "@domain/EntityFactory";
import { TaskEntity } from "@domain/Task/Entity";
import { TaskRepositoryI } from "@domain/Task/Repository";
import { UserRepositoryI } from "@domain/User/Repository";
import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { v1 as uuidv1 } from "uuid";

@autoInjectable()
export class TaskApplication {
  userRepository: UserRepositoryI;
  taskRepository: TaskRepositoryI;
  constructor(
    @inject("UserRepositoryI") userRepository: UserRepositoryI,
    @inject("TaskRepositoryI") taskRepository: TaskRepositoryI
  ) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async addNewTask(payload: AddNewTaskDTO): Promise<TaskEntity> {
    const taskEntity = EntityFactory.createTask(
      uuidv1(),
      payload.name,
      payload.userUUID,
      payload.dueDate
    );

    return await this.taskRepository.addNewTask(taskEntity); // send the entity to domain and return the response
  }

  async deleteTask(payload: GeneralTaskDTO): Promise<TaskEntity> {
    return await this.taskRepository.deleteTask(payload.taskId);
  }

  async fetchTask(payload: GeneralTaskDTO): Promise<TaskEntity> {
    return await this.taskRepository.fetchTask(payload.taskId);
  }

  async updateTask(payload: UpdateTaskDTO): Promise<TaskEntity> {
    return await this.taskRepository.updateTask(
      payload.taskId,
      payload.name,
      payload.completed,
      payload.dueDate
    );
  }

  async fetchAllTasks(
    payload: FetchAllTasksDTO
  ): Promise<PaginatedData<TaskEntity>> {
    //
    const totalTasks = await this.taskRepository.fetchTotalTasks();
    const paginationOptions = new PaginationOptions(
      payload.page,
      payload.perPage,
      totalTasks
    );
    //
    const selectedTasks = await this.taskRepository.fetchAllTasks(
      paginationOptions.getOffset(),
      paginationOptions.perPage
    );

    return new PaginatedData<TaskEntity>(paginationOptions, selectedTasks);
  }
}
