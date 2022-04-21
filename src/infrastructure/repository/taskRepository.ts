import { PrismaClient, Task } from "@prisma/client";
import { Task_Pagination_Limit } from "../config";
import { TaskRepositoryI } from "./TaskRepositoryI";
const prisma = new PrismaClient();

/**
 * interacts with the database directly
 */
export class TaskRepository implements TaskRepositoryI {
  async createNewTask(newTask): Promise<Task> {
    try {
      const newTaskCreated = await prisma.task.create({
        data: {
          uuid: newTask.uuid,
          name: newTask.name,
          user: {
            connectOrCreate: {
              where: {
                uuid: newTask.userUUID,
              },
              create: {
                email: "UserNotFound@prisma.io",
                name: "UserNotFound",
                uuid: "UserNotFound",
                isLoggedIn: true,
              },
            },
          },
        },
        include: {
          user: true,
        },
      });
      return newTaskCreated;
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteTask(taskID): Promise<Task> {
    try {
      const deletedTask = await prisma.task.delete({
        where: {
          id: parseInt(taskID),
        },
      });
      return deletedTask; // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getTask(taskID): Promise<Task> {
    try {
      // get The task
      const getTask = await prisma.task.findUnique({
        where: {
          id: parseInt(taskID),
        },
      });
      return getTask; // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAllTasks(page) {
    // get The task
    return await prisma.task.findMany({
      skip: parseInt(page) - 1, // start from the parameter page by skipping page-1
      take: parseInt(Task_Pagination_Limit), // limit
    });
  }

  async updateTask(taskID): Promise<Task> {
    try {
      // update The task
      const updateTask = await prisma.task.update({
        where: {
          id: parseInt(taskID),
        },
        data: {
          name: "name changed",
        },
      });
      return updateTask; // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
