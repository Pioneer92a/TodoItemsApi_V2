import { TaskRepository } from "../db/repository/taskRepository";
import { TaskServices } from "../services/taskService";

const taskRepository = new TaskRepository();

interface TaskStoreI {
  add(taskEntity);
  remove(taskID);
  update(taskId);
  fetch(taskId);
}

/**
 * store is an abstraction on top of database
 */
export class TaskStore implements TaskStoreI {
  async add(taskEntity) {
    const task = await taskRepository.createNewTask(taskEntity);
    //
    if (task) return TaskServices.createTaskEntity(task);
    else throw new Error(`task could not be added`);
  }

  async remove(taskID) {
    const task = await taskRepository.deleteTask(taskID);
    //
    if (task) return TaskServices.createTaskEntity(task);
    else throw new Error(`task could not be removed`);
  }

  async update(taskId) {
    const task = await taskRepository.updateTask(taskId);
    //
    if (task) return TaskServices.createTaskEntity(task);
    else throw new Error(`task could not be updated`);
  }

  async fetch(taskId) {
    const task = await taskRepository.getTask(taskId);
    //
    if (task) return TaskServices.createTaskEntity(task);
    else throw new Error(`task could not be found`);
  }

  async fetchAll(page) {
    const task = await taskRepository.getAllTasks(page);
    //
    if (task) return task;
    else throw new Error(`tasks not found`);
  }
}
