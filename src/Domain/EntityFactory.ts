import { TaskEntity } from "./Task/Entity";
import { UserEntity } from "./User/Entity";

/**
 * responsible for creating entities using static factory method
 */
export class EntityFactory {
  static createUser(_uuid: string, _name: string, _email: string): UserEntity {
    const _user = new UserEntity(_uuid, _name, _email);
    return _user;
  }

  static createTask(
    _uuid: string,
    _name: string,
    _userUUID: string,
    _dueDate: Date
  ): TaskEntity {
    const _task = new TaskEntity(_uuid, _name, _userUUID, _dueDate);
    return _task;
  }
}
