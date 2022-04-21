import { v1 as uuidv1 } from "uuid";

/**
 * task entity
 */
export class task {
  name: string;
  uuid: string;
  userUUID: string;

  constructor(newTask) {
    this.name = newTask.name;
    this.userUUID = newTask.uuid;
    this.uuid = uuidv1(); // generate uuid
  }
}
