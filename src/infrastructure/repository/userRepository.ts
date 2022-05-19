import { PrismaClient } from "@prisma/client";
import { EntityFactory } from "../../Domain/EntityFactory";
import { UserEntity } from "../../Domain/User/Entity";
import { UserRepositoryI } from "../../Domain/User/Repository";
const prisma = new PrismaClient();

/**
 * interacts with the database directly
 */
export class UserRepository implements UserRepositoryI {
  async logout(userUUID: string): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: {
        uuid: userUUID,
      },
      data: {
        isLoggedIn: false,
      },
    });
    return EntityFactory.createUser(user.uuid, user.name, user.email); //
  }

  async login(userEmail: string): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        isLoggedIn: true,
      },
    });
    return EntityFactory.createUser(user.uuid, user.name, user.email); //
  }

  async addNewUser(newUser: UserEntity): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: {
        uuid: newUser.uuid,
        email: newUser.email,
        name: newUser.name,
        isLoggedIn: true,
      },
    });
    return EntityFactory.createUser(user.uuid, user.name, user.email);
  }

  async fetchUserbyUUID(userUUID: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({
      where: {
        uuid: userUUID,
      },
    });
    return EntityFactory.createUser(user.uuid, user.name, user.email);
  }

  async fetchUserLoginStatus(userUUID: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        uuid: userUUID,
      },
    });
    if (!user) return null;
    else return user.isLoggedIn;
  }

  async fetchUserbyEmail(userEmail: string): Promise<UserEntity> {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (!user) return null;
    else return EntityFactory.createUser(user.uuid, user.name, user.email); //
  }

  async deleteUser(userUUID: string): Promise<UserEntity> {
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
      return EntityFactory.createUser(
        transaction[1].uuid,
        transaction[1].name,
        transaction[1].email
      );
  }
}
