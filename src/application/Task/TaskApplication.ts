import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { v1 as uuidv1 } from "uuid";
import { EntityFactory } from "../../Domain/EntityFactory";
import { TaskEntity } from "../../Domain/Task/Entity";
import { TaskRepositoryI } from "../../Domain/Task/Repository";
import { UserRepositoryI } from "../../Domain/User/Repository";
import {
  checkIfTaskExists,
  checkIfUserExists,
  checkIfUserLoggedIn,
} from "../ApplicationServices";
import {
  AddNewTaskDTO,
  FetchAllTasksDTO,
  GeneralTaskDTO,
  UpdateTaskDTO,
} from "./TaskDTO";

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
      payload.userUUID
    );
    await checkIfUserExists(taskEntity.userUUID, this.userRepository);
    await checkIfUserLoggedIn(taskEntity.userUUID, this.userRepository);
    return await this.taskRepository.addNewTask(taskEntity); // send the entity to domain and return the response
  }

  async deleteTask(payload: GeneralTaskDTO): Promise<TaskEntity> {
    await checkIfUserExists(payload.userUUID, this.userRepository);
    await checkIfUserLoggedIn(payload.userUUID, this.userRepository);
    await checkIfTaskExists(Number(payload.taskId), this.taskRepository);
    return await this.taskRepository.deleteTask(payload.taskId);
  }

  async fetchTask(payload: GeneralTaskDTO): Promise<TaskEntity> {
    await checkIfUserExists(payload.userUUID, this.userRepository);
    await checkIfUserLoggedIn(payload.userUUID, this.userRepository);
    await checkIfTaskExists(Number(payload.taskId), this.taskRepository);
    return await this.taskRepository.fetchTask(payload.taskId);
  }

  async updateTask(payload: UpdateTaskDTO): Promise<TaskEntity> {
    await checkIfUserExists(payload.userUUID, this.userRepository);
    await checkIfUserLoggedIn(payload.userUUID, this.userRepository);
    await checkIfTaskExists(Number(payload.taskId), this.taskRepository);
    return await this.taskRepository.updateTask(
      payload.taskId,
      payload.name,
      payload.completed
    );
  }

  async fetchAllTasks(payload: FetchAllTasksDTO): Promise<TaskEntity[]> {
    await checkIfUserExists(payload.userUUID, this.userRepository);
    await checkIfUserLoggedIn(payload.userUUID, this.userRepository);
    return await this.taskRepository.fetchAllTasks(payload.page);
  }
}
