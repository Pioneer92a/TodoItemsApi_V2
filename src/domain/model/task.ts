/**
 * task entity
 */
export class task {
  name: string;
  uuid: string;
  userUUID: string;

  constructor(newTask) {
    this.name = newTask.name;
    this.uuid = newTask.uuid;
    this.userUUID = newTask.userUUID;
  }
}
