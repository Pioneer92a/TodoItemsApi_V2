import { task } from "../../domain/model/task";

export interface TaskDomainI {
  userRepository;
  taskRepository;
  createNewTask(payload): Promise<task>;
  getTask(payload): Promise<task>;
  getAllTasks(payload): Promise<task[]>;
  updateTask(payload): Promise<task>;
  deleteTask(payload): Promise<task>;
}
