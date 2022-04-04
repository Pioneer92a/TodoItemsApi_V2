import { taskEntity } from "../domain/taskEntity";

export class taskService {
  
  static async createNewTask(newTask): Promise<typeof x> {
   const x = await taskEntity.createNewTask(newTask)
   return x;
  }

//   static async findUser(userID): Promise<typeof x> {
//     const x = await userEntity.findUser(userID)
//     return x;
//    }

   static async deleteTask(taskID): Promise<typeof x> {
    let x;   
    try {
          x = await taskEntity.deleteTask(taskID)
    return x; 
       } catch (e) {
           console.log(e);         
       }
   }

   static async getTask(taskID): Promise<typeof x> {
    let x;   
    try {
          x = await taskEntity.getTask(taskID)
    return x; 
       } catch (e) {
           console.log(e);         
       }
   }
}