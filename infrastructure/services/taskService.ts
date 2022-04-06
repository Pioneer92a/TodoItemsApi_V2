export class TaskService {
    static createTaskEntity(task) {
        const newTaskEntity = {
          name: task.name,
          uuid: task.uuid,
          userUUID: task.userId,
        };
        return newTaskEntity;
      }
}