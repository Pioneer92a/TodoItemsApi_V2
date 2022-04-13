import { UserRepository } from "../infrastructure/db/repository/userRepository";
import { UserServices as UserDBServices } from "../infrastructure/services/userService";
import { TaskStore } from "../infrastructure/stores/taskStore";
import { EntityFactory } from "./entityFactory";

const userRepository = new UserRepository();
const taskStore = new TaskStore();

/**
 * basic crud operations
 */
interface TaskDomainServicesI {
  createNewTask(payload);
  getTask(payload);
  updateTask(payload);
  deleteTask(taskID);
}

export class TaskDomainServices implements TaskDomainServicesI {
  // this function creates a new task after applying the domain rules
  async createNewTask(payload) {
    try {
      const _user = await UserDBServices.findUserbyUUID(
        payload.uuid.toString()
      );

      if (!_user) return { msg: "user not found" };
      if (!_user.isLoggedIn) return { msg: "user not logged in" };

      const taskEntity = EntityFactory.createTask(payload); // create a new task entity by static factory method
      const newTaskCreated = await taskStore.add(taskEntity); // pass on the entity to the task store

      return newTaskCreated;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getTask(payload) {
    try {
      const _user = await UserDBServices.findUserbyUUID(
        payload.uuid.toString()
      );
      if (!_user) return { msg: "user not found" };
      if (!_user.isLoggedIn) return { msg: "user not logged in" };

      const getTask = await taskStore.fetch(payload.taskId);
      return getTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAllTasks(payload) {
    try {
      const _user = await UserDBServices.findUserbyUUID(
        payload.uuid.toString()
      );
      if (!_user) return { msg: "user not found" };
      if (!_user.isLoggedIn) return { msg: "user not logged in" };

      const getTask = await taskStore.fetchAll(payload.page);
      return getTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateTask(payload) {
    try {
      // check if the user exists or not
      const _user = await UserDBServices.findUserbyUUID(
        payload.uuid.toString()
      );

      if (!_user) return { msg: "user not found" };
      if (!_user.isLoggedIn) return { msg: "user not logged in" };

      const getTask = await taskStore.fetch(payload.taskId);
      if (!getTask) return { msg: "task not found" };

      const updateTask = await taskStore.update(payload.taskId);
      return updateTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteTask(payload) {
    try {
      // check if the user exists or not
      const _user = await UserDBServices.findUserbyUUID(
        payload.uuid.toString()
      );

      if (!_user) return { msg: "user not found" };
      if (!_user.isLoggedIn) return { msg: "user not logged in" };

      // check if the task exists or not
      const getTask = await taskStore.fetch(payload.taskId);
      if (!getTask) return { msg: "task not found" };

      const deletedTask = await taskStore.remove(payload.taskId);
      return deletedTask;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
