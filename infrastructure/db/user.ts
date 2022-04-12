import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

interface UserRepositoryI {
  // addTokenToUser(payload, userToken);
  // removeTokenFromUser(payload);
  createNewUser(newUser);
  findUserbyUUID(userID);
  findUserbyEmail(userEmail);
  deleteUser(userID);
}

export class UserRepository implements UserRepositoryI {
  /* async addTokenToUser(payload, userToken): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          email: payload.email,
        },
        data: {
          token: userToken,
        },
      });
      return updatedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  */

  /* async removeTokenFromUser(payload): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          uuid: payload,
        },
        data: {
          token: null,
        },
      });
      return updatedUser;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  */

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
          // token: newUser.token,
          // password: newUser.password,
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

  async findUserbyUUID(userID): Promise<User> {
    try {
      const userFound = await prisma.user.findUnique({
        where: {
          uuid: userID,
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

      // elete a user and all their taks with two separate queries in a transaction (all queries must succeed)
      const transaction = await prisma.$transaction([deleteTasks, deleteUser]);

      return transaction[1]; // return User
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
