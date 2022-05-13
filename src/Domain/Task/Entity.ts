/**
 * task entity
 */
export class TaskEntity {
  uuid: string;
  name: string;
  userUUID: string;

  // constructor(id, name) {
  constructor(_uuid: string, _name: string, _userUUID: string) {
    this.guardAgainst140WordsLongName(_name);
    this.uuid = _uuid;
    this.name = _name;
    this.userUUID = _userUUID;
  }

  // static createFromObj(rawObject) {
  //   return entity
  // }

  private guardAgainst140WordsLongName(_name: string) {
    return true;
    // TO BE IMPLEMENTED LATER
  }
}
