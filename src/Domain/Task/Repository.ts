import { TaskEntity } from "./Entity";

export interface TaskRepositoryI {
  addNewTask(newTask: TaskEntity): Promise<TaskEntity>;
  deleteTask(taskId: number): Promise<TaskEntity>;
  fetchTask(taskId: number): Promise<TaskEntity>;
  updateTask(
    taskId: number,
    name?: string,
    completed?: boolean
  ): Promise<TaskEntity>;
  fetchAllTasks(page: number): Promise<TaskEntity[]>;
}
