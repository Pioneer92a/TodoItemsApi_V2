import { task } from "../domain/model/task";
import { user } from "../domain/model/user";

/**
 * responsible for creating entities using static factory method
 */
export class EntityFactory {
  static createUser(payload): user {
    const _user = new user(payload);
    return _user;
  }

  static createTask(payload): task {
    const _task = new task(payload);
    return _task;
  }
}
