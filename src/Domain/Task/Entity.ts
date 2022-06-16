import { BaseEntity } from "@domain/BaseEntity";

export class TaskEntity extends BaseEntity {
  constructor(
    uuid: string,
    name: string,
    readonly userUUID: string,
    readonly dueDate: Date
  ) {
    super(uuid, name);
    this.guardAgainst140WordsLongName(name);
  }

  // static createFromObj(rawObject) {
  //   return entity
  // }

  private guardAgainst140WordsLongName(name: string) {
    if (name.length < 140) return true;
    else throw new Error("name of task too long");
  }
}
