import { TaskEntity } from "./Entity";

export interface TaskRepositoryI {
  addNewTask(newTask: TaskEntity): Promise<TaskEntity>;
  deleteTask(taskId: number): Promise<TaskEntity>;
  fetchTask(taskId: number): Promise<TaskEntity>;
  updateTask(
    taskId: number,
    name?: string,
    completed?: boolean,
    dueDate?: Date
  ): Promise<TaskEntity>;
  fetchAllTasks(start: number, limit: number): Promise<TaskEntity[]>;
}
