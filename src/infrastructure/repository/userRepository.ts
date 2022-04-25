import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import { UserRepositoryI } from "../interfaces/repoInterface/UserRepositoryI";

/**
 * interacts with the database directly
 */
export class UserRepository implements UserRepositoryI {
  async logout(payload): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          uuid: payload,
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

  async login(payload): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: payload,
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

  async createNewUser(newUser): Promise<User> {
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

  async findUserbyId(userId): Promise<User> {
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

  async findUserbyUUID(userUUID): Promise<User> {
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

  async findUserbyEmail(userEmail): Promise<User> {
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

  async deleteUser(userId): Promise<User> {
    try {
      // find the user first
      const userToDelete = await prisma.user.findUnique({
        where: {
          uuid: userId,
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
          uuid: userId,
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

  async updateUser(userId): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          uuid: userId,
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
