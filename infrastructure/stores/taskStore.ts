import { TaskRepository } from "../db/task";
import { TaskService } from "../services/taskService";

const taskRepository = new TaskRepository();

interface TaskStoreI {
  add(taskEntity);
  remove(taskID);
  update(taskId);
  fetch(taskId);
}

export class TaskStore implements TaskStoreI {


  async add(taskEntity) {
    const newTaskCreated = await taskRepository.createNewTask(taskEntity);
    //
    if (!newTaskCreated) return null;
    else return TaskService.createTaskEntity(newTaskCreated);
  }

  async remove(taskID) {
    const deletedTask = await taskRepository.deleteTask(taskID);
    //
    if (!deletedTask) return null;
    else return TaskService.createTaskEntity(deletedTask);
  }

  async update(taskId) {
    const updatedTask = await taskRepository.updateTask(taskId);
    //
    if (!updatedTask) return null;
    else return TaskService.createTaskEntity(updatedTask);
  }

  async fetch(taskId) {
    const getTask = await taskRepository.getTask(taskId);
    //
    if (!getTask) return null;
    else return TaskService.createTaskEntity(getTask);
  }
}
