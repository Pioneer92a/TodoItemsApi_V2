import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class db {
  static async addTokenToUser(payload, userToken): Promise<User> {
    let x;
    try {
      x = await prisma.user.update({
        where: {
          email: payload.email,
        },
        data: {
          token: userToken,
        },
      })
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async removeTokenFromUser(payload): Promise<User> {
    let x;
    try {
      x = await prisma.user.update({
        where: {
          uuid: payload,
        },
        data: {
          token: null,
        },
      })      
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async createNewUser(newUser): Promise<User> {
    try {
      const x = await prisma.user.create({
        data: {
          uuid: newUser.uuid,
          email: newUser.email,
          name: newUser.name,
          token: newUser.token,
          password: newUser.password,
          // tasks: {
          //   create: [{ name: "Hello Worldssss" }, { name: "asd" }],
          //   // create: [{ name: "Hello Worldssss" }],
          // },
        },
      });
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async findUserbyUUID(userID): Promise<User> {
    let x;
    try {
      x = await prisma.user.findUnique({
        where: {
          uuid: userID,
        },
      });
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async findUserbyEmail(userEmail): Promise<User> {
    let x;
    try {
      x = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
      return x;
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteUser(userID): Promise<User> {
    try {
      // find the user first
      const userToDelete = await prisma.user.findUnique({
        where: {
          uuid: userID,
        },
      });

      // delete the related tasks first
      const deleteTasks = prisma.task.deleteMany({
        where: {
          userId: userToDelete.id,
        },
      });

      // delete the user
      const deleteUser = prisma.user.delete({
        where: {
          uuid: userID,
        },
      });

      // elete a user and all their taks with two separate queries in a transaction (all queries must succeed)
      const transaction = await prisma.$transaction([deleteTasks, deleteUser]);

      return transaction[1]; // return User
    } catch (e) {
      console.log(`error occured in infrastructure layer: ${e}`);
    }
  }
}
