import { db } from "../infrastructure/db/task";

export class taskEntity {
  static async createNewTask(newTask: object): Promise<typeof x> {
    const udpatedTask = new taskDTO(newTask);
    
    const x = await db.createNewTask(udpatedTask);
    return x;
  }

  static async getTask(taskID): Promise<typeof x> {
    const x = await db.getTask(taskID);
    return x;
  }

  static async deleteTask(taskID): Promise<typeof x> {
    const x = await db.deleteTask(taskID);
    return x;
  }
}

class taskDTO {
  name: string;
  userUUID: string;

  constructor(newTask) {
    this.name = newTask.body.name;
    this.userUUID = newTask.uuid;
  }
}
