import { user } from "./user";
import { task } from "./task";

/**
 * responsible for creating entities using static factory method
 */
export class EntityFactory {
  static createUser(payload) {
    const _user = new user(payload);
    return _user;
  }

  static createTask(payload) {
    const _task = new task(payload);
    return _task;
  }
}
