import { UserRepository } from "../infrastructure/db/user";
import { TaskStore } from "../infrastructure/stores/taskStore";
import { Entity } from "./entity";

const userRepository = new UserRepository();
const taskStore = new TaskStore();

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
      const _user = await userRepository.findUserbyUUID(
        payload.uuid.toString()
      );
      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      const taskEntity = Entity.createTask(payload); // create a new task entity by static factory method
      const newTaskCreated = await taskStore.add(taskEntity);

      return newTaskCreated;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getTask(payload) {
    try {
      const _user = await userRepository.findUserbyUUID(
        payload.uuid.toString()
      );
      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      const getTask = await taskStore.fetch(payload.taskId);
      return getTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateTask(payload) {
    try {
      // check if the user exists or not
      const _user = await userRepository.findUserbyUUID(
        payload.uuid.toString()
      );
      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      // check if the task exists or not
      const getTask = await taskStore.fetch(payload.taskId);
      if (!getTask) return null; // return if the task doesn't exist

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
      const _user = await userRepository.findUserbyUUID(
        payload.uuid.toString()
      );
      if (!_user || !_user.token) return null;
      // return null if user or its token is not found ... it means user has either logged out or deleted
      // this logic may later be moved to a higher layer of domain

      // check if the task exists or not
      const getTask = await taskStore.fetch(payload.taskId);
      if (!getTask) return null; // return if the task doesn't exist

      const deletedTask = await taskStore.remove(payload.taskId);
      return deletedTask;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
