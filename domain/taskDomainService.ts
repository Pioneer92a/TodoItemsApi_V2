import { UserDBServices } from "../infrastructure/services/userDBService";
import { TaskStore } from "../infrastructure/stores/taskStore";
import { EntityFactory } from "./entityFactory";

const taskStore = new TaskStore();

/**
 * basic crud operations
 */
interface TaskDomainServiceI {
  createNewTask(payload);
  getTask(payload);
  updateTask(payload);
  deleteTask(taskID);
}

export class TaskDomainService implements TaskDomainServiceI {
  async createNewTask(payload) {
    // input validations
    // if (!payload)
    //   throw new Error(`payload not found at ${TaskDomainServices.name}`);
    // if (!payload.uuid || !payload.userUUID)
    //   throw new Error(`payload not proper at ${TaskDomainServices.name}`);

    const _user = await UserDBServices.findUserbyUUID(payload.uuid.toString());
    // Business logic
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    const taskEntity = EntityFactory.createTask(payload); // create a new task entity by static factory method
    if (!taskEntity) throw new Error(`task entity could not be created`);
    //
    return await taskStore.add(taskEntity); // pass on the entity to the task store and return the result to application layer
  }

  async getTask(payload) {
    const _user = await UserDBServices.findUserbyUUID(payload.uuid.toString());
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    return await taskStore.fetch(payload.taskId);
  }

  async getAllTasks(payload) {
    // check if user exists and logged in
    const _user = await UserDBServices.findUserbyUUID(payload.uuid.toString());
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    return await taskStore.fetchAll(payload.page);
  }

  async updateTask(payload) {
    // check if user exists and logged in
    const _user = await UserDBServices.findUserbyUUID(payload.uuid.toString());
    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    const getTask = await taskStore.fetch(payload.taskId);
    if (!getTask) return { msg: "task not found" };

    return await taskStore.update(payload.taskId);
  }

  async deleteTask(payload) {
    const _user = await UserDBServices.findUserbyUUID(payload.uuid.toString());

    if (!_user) throw new Error("user with given uuid not found");
    if (!_user.isLoggedIn) throw new Error("user with given not logged in");

    // check if the task exists or not
    const getTask = await taskStore.fetch(payload.taskId);
    if (!getTask) return { msg: "task not found" };

    return await taskStore.remove(payload.taskId);
  }
}
