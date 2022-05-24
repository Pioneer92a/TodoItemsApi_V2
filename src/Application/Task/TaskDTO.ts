export class AddNewTaskDTO {
  name: string;
  userUUID: string;
  dueDate?: Date;
  constructor(_name: string, _userUUID: string, _dueDate?: string) {
    throwErrorIfNoName(_name);
    //
    this.name = _name;
    this.userUUID = _userUUID;
    this.dueDate = new Date(_dueDate);
  }
}

export class GeneralTaskDTO {
  taskId: number;
  userUUID: string;
  constructor(_taskId: string, _userUUID: string) {
    throwErrorIfNoId(_taskId);
    throwErrorIfNoUserUUID(_userUUID);
    //
    this.taskId = parseInt(_taskId);
    this.userUUID = _userUUID;
  }
}

export class UpdateTaskDTO {
  taskId: number;
  userUUID: string;
  name: string;
  completed: boolean;
  dueDate: Date;
  constructor(
    _taskId: string,
    _userUUID: string,
    _name: string,
    _completed: boolean,
    _dueDate: string
  ) {
    throwErrorIfNoId(_taskId);
    throwErrorIfNoUserUUID(_userUUID);
    //
    this.taskId = parseInt(_taskId);
    this.userUUID = _userUUID;
    this.name = _name;
    this.completed = _completed;
    this.dueDate = new Date(_dueDate);
  }
}

export class FetchAllTasksDTO {
  page: number;
  perPage: number;
  userUUID: string;
  constructor(page: string, perPage: string, _userUUID: string) {
    // throwErrorIfNoOffsetDetails(_start);
    throwErrorIfNoUserUUID(_userUUID);
    //
    this.page = parseInt(page);
    this.perPage = parseInt(perPage);
    this.userUUID = _userUUID;
  }
}

function throwErrorIfNoName(arg: string) {
  if (!arg) throw new Error("name not sent with the request body");
}

function throwErrorIfNoUserUUID(arg: string) {
  if (!arg) throw new Error("user UUID not sent with the request body");
}

function throwErrorIfNoId(arg: string) {
  if (!arg) throw new Error("user UUID not sent with the request body");
}

function throwErrorIfNoOffsetDetails(arg: string) {
  if (!arg) throw new Error("user UUID not sent with the request body");
}
