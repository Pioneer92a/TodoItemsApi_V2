import { TaskDomainServices } from "../domain/taskDomainServices";
const taskDomainServices = new TaskDomainServices();

interface TaskApplicationServiceI {
  createNewTask(newTask);
  deleteTask(taskID);
  getTask(payload);
  updateTask(payload);
}

export class TaskApplicationService implements TaskApplicationServiceI {
  async createNewTask(payload) {
    return await taskDomainServices.createNewTask(payload);
  }

  async deleteTask(payload) {
    try {
      const deletedTask = await taskDomainServices.deleteTask(payload);
      return deletedTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getTask(payload) {
    try {
      const getTask = await taskDomainServices.getTask(payload);
      return getTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAllTasks(payload) {
    try {
      const getTask = await taskDomainServices.getAllTasks(payload);
      return getTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateTask(payload) {
    try {
      const updateTask = await taskDomainServices.updateTask(payload);
      return updateTask;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
