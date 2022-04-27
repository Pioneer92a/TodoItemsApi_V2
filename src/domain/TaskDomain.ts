import { autoInjectable, inject } from "tsyringe";
import { TaskRepositoryI } from "./RepoInterface/TaskRepositoryI";
import { UserRepositoryI } from "./RepoInterface/UserRepositoryI";
import { TaskEntity } from "./Entity/Task";

@autoInjectable()
export class TaskDomain {
  userRepository: UserRepositoryI;
  taskRepository: TaskRepositoryI;
  constructor(
    @inject("UserRepositoryI") userRepository: UserRepositoryI,
    @inject("TaskRepositoryI") taskRepository: TaskRepositoryI
  ) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async createNewTask(TaskEntity: TaskEntity): Promise<TaskEntity> {
    const rawTask = await this.taskRepository.createNewTask(TaskEntity);
    return await this.createReturnEntity(rawTask);
  }

  async getTask(taskId: number): Promise<TaskEntity> {
    const taskObj = await this.taskRepository.getTask(taskId);
    return await this.createReturnEntity(taskObj);
  }

  async updateTask(taskId: number): Promise<TaskEntity> {
    const taskObj = await this.taskRepository.updateTask(taskId);
    return await this.createReturnEntity(taskObj);
  }

  async deleteTask(taskId: number): Promise<TaskEntity> {
    const taskObj = await this.taskRepository.deleteTask(taskId);
    return this.createReturnEntity(taskObj);
  }

  async getAllTasks(page: number): Promise<TaskEntity[]> {
    const taskObjs = await this.taskRepository.getAllTasks(page);
    return this.createReturnEntityArray(taskObjs);
  }

  /**
   * creates a Task entity for return purposes
   */
  private async createReturnEntity(taskObj) {
    if (!taskObj) return null; // return null if input arg is null

    // we only have userId from returned Task Object. We need UserUUID.
    // first find the user with the given userId. Later use its UUID
    const user = await this.userRepository.findUserbyId(
      parseInt(taskObj.userId)
    );
    return new TaskEntity({
      name: taskObj.name,
      uuid: taskObj.uuid,
      userUUID: user.uuid,
    });
  }

  /**
   * creates a Task entity array for return purposes
   */
  private async createReturnEntityArray(taskObjs) {
    // we need to create entity of each of the returned Tasks
    // first find the user with the given userId for any Task. Later use its UUID
    const user = await this.userRepository.findUserbyId(
      parseInt(taskObjs[0].userId)
    );

    // iterate over the given taskObjs array to convert it into array of entities
    const updatedTasks = [];
    taskObjs.forEach((taskObj, index) => {
      updatedTasks[index] = new TaskEntity({
        name: taskObj.name,
        uuid: taskObj.uuid,
        userUUID: user.uuid,
      });
    });

    return updatedTasks;
  }
}
