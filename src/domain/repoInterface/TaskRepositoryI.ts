import { Task } from "@prisma/client";
import { TaskEntity } from "../Entity/Task";

export interface TaskRepositoryI {
  createNewTask(newTask: TaskEntity): Promise<Task>;
  deleteTask(taskId: number): Promise<Task>;
  getTask(taskId: number): Promise<Task>;
  updateTask(taskId: number): Promise<Task>;
  getAllTasks(page: number): Promise<Task[]>;
}
