import { PrismaClient, Task } from "@prisma/client";
import { Task_Pagination_Limit } from "../Config";
import { TaskRepositoryI } from "../../Domain/Task/TaskRepository";
import { TaskEntity } from "../../Domain/Task/TaskEntity";
const prisma = new PrismaClient();

/**
 * interacts with the database directly
 */
export class TaskRepository implements TaskRepositoryI {
  async addNewTask(newTask: TaskEntity): Promise<Task> {
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

  async deleteTask(taskId: number): Promise<Task> {
    try {
      const deletedTask = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
      return deletedTask; // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchTask(taskId: number): Promise<Task> {
    try {
      // get The task
      const getTask = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
      });
      return getTask; // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateTask(taskId: number): Promise<Task> {
    try {
      // update The task
      const updateTask = await prisma.task.update({
        where: {
          id: taskId,
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

  async fetchAllTasks(page: number): Promise<Task[]> {
    // get The task
    return await prisma.task.findMany({
      skip: page - 1, // start from the parameter page by skipping page-1
      take: parseInt(Task_Pagination_Limit), // limit
    });
  }
}
