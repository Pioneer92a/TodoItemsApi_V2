import { Task } from "@prisma/client";
import { TaskEntity } from "./TaskEntity";

export interface TaskRepositoryI {
  addNewTask(newTask: TaskEntity): Promise<Task>;
  deleteTask(taskId: number): Promise<Task>;
  fetchTask(taskId: number): Promise<Task>;
  updateTask(taskId: number): Promise<Task>;
  fetchAllTasks(page: number): Promise<Task[]>;
}
