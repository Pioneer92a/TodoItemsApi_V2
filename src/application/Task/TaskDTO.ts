export class AddNewTaskDTO {
  name: string;
  userUUID: string;
  constructor(_name: string, _userUUID: string) {
    throwErrorIfNoName(_name);
    throwErrorIfNoUserUUID(_userUUID);
    //
    this.name = _name;
    this.userUUID = _userUUID;
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
  constructor(
    _taskId: string,
    _userUUID: string,
    _name: string,
    _completed: boolean
  ) {
    throwErrorIfNoId(_taskId);
    throwErrorIfNoUserUUID(_userUUID);
    //
    this.taskId = parseInt(_taskId);
    this.userUUID = _userUUID;
    this.name = _name;
    this.completed = _completed;
  }
}

export class FetchAllTasksDTO {
  page: number;
  userUUID: string;
  constructor(_page: string, _userUUID: string) {
    throwErrorIfNoOffsetDetails(_page);
    throwErrorIfNoUserUUID(_userUUID);
    //
    this.page = parseInt(_page);
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
