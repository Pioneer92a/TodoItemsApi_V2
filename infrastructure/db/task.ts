import { PrismaClient, User, Task } from "@prisma/client";

const prisma = new PrismaClient();

export class db {

  // -- this gives error when we try to set more than one tasks to same user
  static async createNewTask(newTask): Promise<Task> {
    try {     
      const x = await prisma.task.create({
        data: {  
          name: newTask.name,
          user: {
            connectOrCreate: {
              where: {
                uuid: newTask.userUUID,
              },
              create: {
                email: "viola@prisma.io",
                name: "Viola",
              },
            },
          },
        },
        include: {
          user: true,
        },
      });

      // const _user = await prisma.user.findUnique({
      //   where: {
      //     uuid: newTask.userUUID,
      //   },
      // })

      // const x = await prisma.task.create({
      //   data: {  
      //     name: newTask.name,
      //     user: _user,
      //   },
      //   include: {
      //     user: true,
      //   },
      // });

      return x;
    } 
    catch (e) {
      console.log(`error occured in infrastructure layer: ${e}`);
    }
  }

  static async deleteTask(taskID): Promise<Task> {
    try {
     // delete the task
      const deleteTask = prisma.task.delete({
        where: {
          id: parseInt(taskID),
        },
      });

      return deleteTask; // return task

    } catch (e) {
      console.log(`error occured in infrastructure layer: ${e}`);
    }
  }

  static async getTask(taskID): Promise<Task> {
    try {
     // get The task
      const getTask = prisma.task.findUnique({
        where: {
          id: parseInt(taskID),
        },
      });

      return getTask; // return task

    } catch (e) {
      console.log(`error occured in infrastructure layer: ${e}`);
    }
  }
  // static async findUser(userID): Promise<User> {
  //   const x = await prisma.user.findUnique({
  //     where: {
  //       id: (userID),
  //     },
  //   });
  //   return x;
  // }

  // static async deleteUser(userID): Promise<User> {
  //   try {

  //     // delete the related tasks first
  //     const deleteTasks = prisma.task.deleteMany({
  //       where: {
  //         userId: (userID),
  //       },
  //     })

  //     // delete the user
  //     const deleteUser = prisma.user.delete({
  //       where: {
  //         id: (userID),
  //       },
  //     });

  //     // elete a user and all their taks with two separate queries in a transaction (all queries must succeed)
  //     const transaction = await prisma.$transaction([deleteTasks, deleteUser])

  //     return transaction[1]; // return User

  //   } catch (e) {
  //     console.log(`error occured in infrastructure layer: ${e}`);
  //   }
  // }
}
