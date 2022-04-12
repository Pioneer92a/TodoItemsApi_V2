import { v1 as uuidv1 } from "uuid";

// static factory method
export class Entity {
  static createUser(payload) {
    const _user = new user(payload);
    return _user;
  }

  static createTask(payload) {
    const _task = new task(payload);
    return _task;
  }
}

// user entity
class user {
  name: string;
  email: string;
  uuid: string;
  password: string;

  constructor(newUser) {
    this.name = newUser.name;
    this.email = newUser.email;
    this.uuid = uuidv1(); // generate uuid
    this.password = 'dummyPass';
  }
}

// task entity
class task {
  name: string;
  uuid: string;
  userUUID: string;

  constructor(newTask) {
    this.name = newTask.name;
    this.userUUID = newTask.uuid;
    this.uuid = uuidv1(); // generate uuid
  }
}
