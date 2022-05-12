/**
 * task entity
 */
export class TaskEntity {
  name: string;
  uuid: string;
  userUUID: string;

  // constructor(id, name) {
  constructor(newTask) {
    // this.guardAgainst140WordsLongName(newTask.name)
    this.name = newTask.name;
    this.uuid = newTask.uuid;
    this.userUUID = newTask.userUUID;
  }

  // static createFromObj(rawObject) {
  //   return entity
  // }

  // private guardAgainst140WordsLongName() {

  // }
}
