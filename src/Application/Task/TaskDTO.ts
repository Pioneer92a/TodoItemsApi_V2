import { z } from "zod";
const stringSchema = z.string().min(1); // shouldn't be empty
const numberSchema = z.number().min(1); // shoudn't be less than 1
const uuidSchema = z.string().uuid();

export class AddNewTaskDTO {
  dueDate?: Date;
  constructor(
    readonly name: string,
    readonly userUUID: string,
    private readonly _dueDate?: string
  ) {
    stringSchema.parse(name); // check if name is existent
    this.dueDate = new Date(_dueDate);
  }
}

export class GeneralTaskDTO {
  constructor(readonly taskId: number, readonly userUUID: string) {
    numberSchema.parse(taskId); // check if taskId is correct
    uuidSchema.parse(userUUID); // check if userUUID is correct
  }
}

export class UpdateTaskDTO {
  dueDate?: Date;
  constructor(
    readonly taskId: number,
    readonly userUUID: string,
    readonly name: string,
    readonly completed: boolean,
    private readonly _dueDate: string
  ) {
    numberSchema.parse(taskId);
    uuidSchema.parse(userUUID);
    this.dueDate = new Date(_dueDate);
  }
}

export class FetchAllTasksDTO {
  constructor(
    readonly page: number,
    readonly perPage: number,
    readonly userUUID: string
  ) {
    uuidSchema.parse(userUUID);
  }
}
