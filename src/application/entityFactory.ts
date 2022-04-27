import { TaskEntity } from "../Domain/Entity/Task";
import { UserEntity } from "../Domain/Entity/User";

/**
 * responsible for creating entities using static factory method
 */
export class EntityFactory {
  static createUser(payload): UserEntity {
    const _user = new UserEntity(payload);
    return _user;
  }

  static createTask(payload): TaskEntity {
    const _task = new TaskEntity(payload);
    return _task;
  }
}
