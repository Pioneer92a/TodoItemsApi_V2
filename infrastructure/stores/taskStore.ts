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
    const newTaskCreated = await taskRepository.createNewTask(taskEntity);
    //
    if (!newTaskCreated) return null;
    else return TaskServices.createTaskEntity(newTaskCreated);
  }

  async remove(taskID) {
    const deletedTask = await taskRepository.deleteTask(taskID);
    //
    if (!deletedTask) return null;
    else return TaskServices.createTaskEntity(deletedTask);
  }

  async update(taskId) {
    const updatedTask = await taskRepository.updateTask(taskId);
    //
    if (!updatedTask) return null;
    else return TaskServices.createTaskEntity(updatedTask);
  }

  async fetch(taskId) {
    const getTask = await taskRepository.getTask(taskId);
    //
    if (!getTask) return null;
    else return TaskServices.createTaskEntity(getTask);
  }
}
