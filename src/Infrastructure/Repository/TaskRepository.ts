import { EntityFactory } from "@domain/EntityFactory";
import { TaskEntity } from "@domain/Task/Entity";
import { TaskRepositoryI } from "@domain/Task/Repository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TaskRepository implements TaskRepositoryI {
  async addNewTask(newTask: TaskEntity): Promise<TaskEntity> {
    try {
      const _dueDate = new Date();
      _dueDate.setDate(_dueDate.getDate() + 14); // set due date after two weeks by default ... change it later

      const newTaskCreated = await prisma.task.create({
        data: {
          uuid: newTask.uuid,
          name: newTask.name,
          dueDate: newTask.dueDate,
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
      // console.log(newTaskCreated);

      return EntityFactory.createTask(
        newTaskCreated.uuid,
        newTaskCreated.name,
        newTaskCreated.user.uuid,
        newTaskCreated.dueDate
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
          deletedTask.user.uuid,
          deletedTask.dueDate
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
        getTask.user.uuid,
        getTask.dueDate
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateTask(
    taskId: number,
    updatedName: string,
    _completed: boolean,
    _dueDate: Date
  ): Promise<TaskEntity> {
    try {
      const updateTask = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          name: updatedName,
          completed: _completed,
          dueDate: _dueDate,
        },
        include: {
          user: true,
        },
      });

      return EntityFactory.createTask(
        updateTask.uuid,
        updateTask.name,
        updateTask.user.uuid,
        updateTask.dueDate
      ); // return task
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async fetchAllTasks(page: number, perPage: number): Promise<TaskEntity[]> {
    const fetchAllTasks = await prisma.task.findMany({
      skip: page - 1, // start from the parameter page by skipping page-1
      take: perPage, // limit
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
        task.user.uuid,
        task.dueDate
      );
    });
    return fetchAllTasksEdited;
  }

  async fetchTotalTasks(): Promise<number> {
    const totalTasks = await prisma.task.count();
    return totalTasks;
  }
}
