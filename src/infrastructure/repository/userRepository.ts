import { PrismaClient, User } from "@prisma/client";
import { UserEntity } from "../../Domain/User/UserEntity";
const prisma = new PrismaClient();
import { UserRepositoryI } from "../../Domain/User/UserRepository";

/**
 * interacts with the database directly
 */
export class UserRepository implements UserRepositoryI {
  async logout(userUUID: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          uuid: userUUID,
        },
        data: {
          isLoggedIn: false,
        },
      });
      return updatedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async login(userEmail: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          isLoggedIn: true,
        },
      });
      return updatedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addNewUser(newUser: UserEntity): Promise<User> {
    try {
      const newUserCreated = await prisma.user.create({
        data: {
          uuid: newUser.uuid,
          email: newUser.email,
          name: newUser.name,
          isLoggedIn: true,
        },
      });
      return newUserCreated;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchUserbyId(userId: number): Promise<User> {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      return userFound;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchUserbyUUID(userUUID: string): Promise<User> {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          uuid: userUUID,
        },
      });
      return userFound;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchUserbyEmail(userEmail: string): Promise<User> {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
      return userFound;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteUser(userUUID: string): Promise<User> {
    try {
      // find the user first
      const userToDelete = await prisma.user.findUnique({
        where: {
          uuid: userUUID,
        },
      });
      // return if user doesn't exist
      if (!userToDelete) return null;

      // delete the related tasks first
      const deleteTasks = prisma.task.deleteMany({
        where: {
          userId: userToDelete.id,
        },
      });

      // delete the user
      const deleteUser = prisma.user.delete({
        where: {
          uuid: userUUID,
        },
      });

      // delete a user and all their taks with two separate queries in a transaction (all queries must succeed)
      const transaction = await prisma.$transaction([deleteTasks, deleteUser]);

      return transaction[1]; // return User
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateUser(userUUID: string): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          uuid: userUUID,
        },
        data: {
          name: "name changed",
        },
      });
      return updatedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
