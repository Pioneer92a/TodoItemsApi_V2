export class TaskDBServices {
  /**
   * takes in the task body and returns task entity
   */
  static createTaskEntity(task) {
    const newTaskEntity = {
      name: task.name,
      uuid: task.uuid,
      userId: task.userId,
    };
    return newTaskEntity;
  }

  static;
}
