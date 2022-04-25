import { Task } from "@prisma/client";

export interface TaskRepositoryI {
  createNewTask(newTask): Promise<Task>;
  deleteTask(taskID): Promise<Task>;
  getTask(taskID): Promise<Task>;
  updateTask(taskID): Promise<Task>;
  getAllTasks(page): Promise<Task[]>;
}
