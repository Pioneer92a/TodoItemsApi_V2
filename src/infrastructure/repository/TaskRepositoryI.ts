export interface TaskRepositoryI {
  createNewTask(newTask);
  deleteTask(taskID);
  getTask(taskID);
  getAllTasks(page);
  updateTask(taskID);
}
