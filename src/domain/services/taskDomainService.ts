import { EntityFactory } from "../model/entityFactory";
import { autoInjectable, inject } from "tsyringe";
import { TaskRepositoryI } from "../../infrastructure/repository/TaskRepositoryI";
import { UserRepositoryI } from "../../infrastructure/repository/UserRepositoryI";

@autoInjectable()
export class TaskDomainService {
  userRepository: UserRepositoryI;
  taskRepository: TaskRepositoryI;
  constructor(
    @inject("UserRepositoryI") userRepository: UserRepositoryI,
    @inject("TaskRepositoryI") taskRepository: TaskRepositoryI
  ) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async createNewTask(payload) {
    // input validations
    // if (!payload)
    //   throw new Error(`payload not found at ${TaskDomainServices.name}`);
    // if (!payload.uuid || !payload.userUUID)
    //   throw new Error(`payload not proper at ${TaskDomainServices.name}`);

    const _user = await this.userRepository.findUserbyUUID(
      payload.uuid.toString()
    );
    // Business logic
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn)
      throw new Error("user with given uuid not logged in");

    const taskEntity = EntityFactory.createTask(payload); // create a new task entity by static factory method
    if (!taskEntity) throw new Error(`task entity could not be created`);
    //
    const task = await this.taskRepository.createNewTask(taskEntity);
    if (task) return task; // create entity later
    else throw new Error(`user could not be added`);
    return task;
    // return await taskStore.add(taskEntity); // pass on the entity to the task store and return the result to application layer
  }

  async getTask(payload) {
    const _user = await this.userRepository.findUserbyUUID(
      payload.uuid.toString()
    );
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    return await this.taskRepository.getTask(payload.taskId);
  }

  async getAllTasks(payload) {
    // check if user exists and logged in
    const _user = await this.userRepository.findUserbyUUID(
      payload.uuid.toString()
    );
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    return await this.taskRepository.getAllTasks(payload.page);
  }

  async updateTask(payload) {
    // check if user exists and logged in
    const _user = await this.userRepository.findUserbyUUID(
      payload.uuid.toString()
    );
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    const getTask = await this.taskRepository.getTask(payload.taskId);
    if (!getTask) return { msg: "task not found" };

    return await this.taskRepository.updateTask(payload.taskId);
  }

  async deleteTask(payload) {
    const _user = await this.userRepository.findUserbyUUID(
      payload.uuid.toString()
    );

    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    // check if the task exists or not
    const getTask = await this.taskRepository.getTask(payload.taskId);
    if (!getTask) return { msg: "task not found" };

    return await this.taskRepository.deleteTask(payload.taskId);
  }
}
