import { PrismaClient } from "@prisma/client";
import { EntityFactory } from "../../Domain/EntityFactory";
import { TaskEntity } from "../../Domain/Task/Entity";
import { TaskRepositoryI } from "../../Domain/Task/Repository";
import { Task_Pagination_Limit } from "../Config";
const prisma = new PrismaClient();

/**
 * interacts with the database directly
 */
export class TaskRepository implements TaskRepositoryI {
  async addNewTask(newTask: TaskEntity): Promise<TaskEntity> {
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
      return EntityFactory.createTask(
        newTaskCreated.uuid,
        newTaskCreated.name,
        newTaskCreated.user.uuid
      );
      //
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async deleteTask(taskId: number): Promise<TaskEntity> {
    try {
      const deletedTask = await prisma.task.delete({
        where: {
          id: taskId,
        },
        include: {
          user: true,
        },
      });
      if (!deletedTask) return null;
      else
        return EntityFactory.createTask(
          deletedTask.uuid,
          deletedTask.name,
          deletedTask.user.uuid
        );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchTask(taskId: number): Promise<TaskEntity> {
    try {
      // get The task
      const getTask = await prisma.task.findUnique({
        where: {
          id: taskId,
        },
        include: {
          user: true,
        },
      });
      return EntityFactory.createTask(
        getTask.uuid,
        getTask.name,
        getTask.user.uuid
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateTask(
    taskId: number,
    updatedName: string,
    _completed: boolean
  ): Promise<TaskEntity> {
    try {
      const updateTask = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          name: updatedName,
          completed: _completed,
        },
        include: {
          user: true,
        },
      });
      return EntityFactory.createTask(
        updateTask.uuid,
        updateTask.name,
        updateTask.user.uuid
      ); // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchAllTasks(page: number): Promise<TaskEntity[]> {
    // get The task
    const fetchAllTasks = await prisma.task.findMany({
      skip: page - 1, // start from the parameter page by skipping page-1
      take: parseInt(Task_Pagination_Limit), // limit
      include: {
        user: true,
      },
    });
    // the following lines make sure we return an array of entities
    const fetchAllTasksEdited = [];
    fetchAllTasks.forEach((task, index) => {
      fetchAllTasksEdited[index] = EntityFactory.createTask(
        task.uuid,
        task.name,
        task.user.uuid
      );
    });
    return fetchAllTasksEdited;
  }
}
