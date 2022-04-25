import { autoInjectable, inject } from "tsyringe";
import { TaskDomainI } from "../../application/domainInterfaces/taskDomainI";
import { TaskRepositoryI } from "../repoInterface/TaskRepositoryI";
import { UserRepositoryI } from "../repoInterface/UserRepositoryI";
import { task } from "../model/task";

@autoInjectable()
export class TaskDomain implements TaskDomainI {
  userRepository: UserRepositoryI;
  taskRepository: TaskRepositoryI;
  constructor(
    @inject("UserRepositoryI") userRepository: UserRepositoryI,
    @inject("TaskRepositoryI") taskRepository: TaskRepositoryI
  ) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async createNewTask(taskEntity): Promise<task> {
    const user = await this.userRepository.findUserbyUUID(
      taskEntity.userUUID.toString()
    );
    // Business logic
    this.checkIfUserExists(user);
    this.checkIfUserLoggedIn(user);

    const rawTask = await this.taskRepository.createNewTask(taskEntity);
    return await this.createReturnEntity(rawTask);
  }

  async getTask(task): Promise<task> {
    const user = await this.userRepository.findUserbyUUID(task.userUUID);
    this.checkIfUserExists(user);
    this.checkIfUserLoggedIn(user);

    const taskObj = await this.taskRepository.getTask(task.taskId);
    return await this.createReturnEntity(taskObj);
  }

  async updateTask(task): Promise<task> {
    const user = await this.userRepository.findUserbyUUID(task.userUUID);
    this.checkIfUserExists(user);
    this.checkIfUserLoggedIn(user);

    const getTask = await this.taskRepository.getTask(task.taskId);
    this.checkIfTaskExists(getTask);

    const taskObj = await this.taskRepository.updateTask(task.taskId);
    return await this.createReturnEntity(taskObj);
  }

  async deleteTask(task): Promise<task> {
    const user = await this.userRepository.findUserbyUUID(task.userUUID);

    this.checkIfUserExists(user);
    this.checkIfUserLoggedIn(user);

    // check if the task exists or not
    const getTask = await this.taskRepository.getTask(task.taskId);
    this.checkIfTaskExists(getTask);
    //
    const taskObj = await this.taskRepository.deleteTask(task.taskId);
    return this.createReturnEntity(taskObj);
  }

  /**
   * throw an error if the task doesn't exist
   */
  private checkIfTaskExists(task) {
    if (!task) throw new Error("task does not exist");
  }

  /**
   * throw an error if user doesn't exist
   */
  private checkIfUserExists(user) {
    if (!user) throw new Error("user with given uuid not found");
  }

  /**
   * throw an error if user isn't logged in
   */
  private checkIfUserLoggedIn(user) {
    if (!user.isLoggedIn) throw new Error("user with given not logged in");
  }

  async getAllTasks(tasks): Promise<task[]> {
    const user = await this.userRepository.findUserbyUUID(tasks.userUUID);
    this.checkIfUserExists(user);
    this.checkIfUserLoggedIn(user);

    const taskObjs = await this.taskRepository.getAllTasks(tasks.page);

    return this.createReturnEntityArray(taskObjs);
  }
  /**
   * creates a task entity for return purposes
   */
  private async createReturnEntity(taskObj) {
    if (!taskObj) return null; // return null if input arg is null

    // we only have userId from returned task Object. We need UserUUID.
    // first find the user with the given userId. Later use its UUID
    const user = await this.userRepository.findUserbyId(taskObj.userId);
    return new task({
      name: taskObj.name,
      uuid: taskObj.uuid,
      userUUID: user.uuid,
    });
  }

  /**
   * creates a task entity array for return purposes
   */
  private async createReturnEntityArray(taskObjs) {
    // we need to create entity of each of the returned tasks
    // first find the user with the given userId for any task. Later use its UUID
    const user = await this.userRepository.findUserbyId(taskObjs[0].userId);

    // iterate over the given taskObjs array to convert it into array of entities
    const updatedTasks = [];
    taskObjs.forEach((taskObj, index) => {
      updatedTasks[index] = new task({
        name: taskObj.name,
        uuid: taskObj.uuid,
        userUUID: user.uuid,
      });
    });

    return updatedTasks;
  }
}
