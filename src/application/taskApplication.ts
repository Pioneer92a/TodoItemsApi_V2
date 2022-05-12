import "reflect-metadata";
import { autoInjectable, inject } from "tsyringe";
import { TaskEntity } from "../Domain/Task/TaskEntity";
import { TaskRepositoryI } from "../Domain/Task/TaskRepository";
import { UserRepositoryI } from "../Domain/User/UserRepository";
import { validateTask, validateUser } from "./ApplicationServices";
import {
  createNewTaskDTO,
  getAllTasksDTO,
  taskDTOforRUD,
} from "./DTOs/TaskDTO";

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

  // async createNewTask(payload: AddNewTaskDTO): Promise<TaskEntity> {
  async addNewTask(payload: any): Promise<any> {
    const taskEntity = createNewTaskDTO(payload); // create TaskEntity if possible
    await validateUser(taskEntity.userUUID, this.userRepository); // validate if user exists and is logged in
    return await this.taskRepository.addNewTask(taskEntity); // send the entity to domain and return the response
  }

  async deleteTask(payload): Promise<any> {
    const taskDTO = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userRepository);
    await validateTask(taskDTO, this.taskRepository);
    return await this.taskRepository.deleteTask(parseInt(taskDTO.taskId));
  }

  async fetchTask(payload): Promise<any> {
    const taskDTO = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userRepository);
    await validateTask(taskDTO, this.taskRepository);
    return await this.taskRepository.fetchTask(parseInt(taskDTO.taskId));
  }

  async fetchAllTasks(payload): Promise<any[]> {
    const taskDTO = getAllTasksDTO(payload);
    await validateUser(payload.userUUID, this.userRepository);
    return await this.taskRepository.fetchAllTasks(parseInt(taskDTO.page));
  }

  async updateTask(payload): Promise<any> {
    const taskDTO = taskDTOforRUD(payload);
    await validateUser(payload.userUUID, this.userRepository);
    await validateTask(taskDTO, this.taskRepository);
    return await this.taskRepository.updateTask(parseInt(taskDTO.taskId));
  }

  /**
   * creates a Task entity for return purposes
   */
  private async createReturnEntity(taskObj) {
    if (!taskObj) return null; // return null if input arg is null

    // we only have userId from returned Task Object. We need UserUUID.
    // first find the user with the given userId. Later use its UUID
    const user = await this.userRepository.fetchUserbyId(
      parseInt(taskObj.userId)
    );
    return new TaskEntity({
      name: taskObj.name,
      uuid: taskObj.uuid,
      userUUID: user.uuid,
    });
  }
}
