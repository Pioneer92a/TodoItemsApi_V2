import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { TaskApplication } from "../../Application/Task/TaskApplication";
import {
  AddNewTaskDTO,
  FetchAllTasksDTO,
  GeneralTaskDTO,
  UpdateTaskDTO,
} from "../../Application/Task/TaskDTO";
import { container } from "../../Infrastructure/Cross-Cutting/Container";
import AuthServices from "../Services/AuthServices";
const taskApplication = container.resolve(TaskApplication);

@Controller("task")
export class TaskController {
  @Post("/create")
  async createTask(@Req() req: Request) {
    const userUUID = req.body.uuid;
    const { name, dueDate } = req.body;
    const addNewTaskDTO = new AddNewTaskDTO(name, userUUID, dueDate);
    return await taskApplication.addNewTask(addNewTaskDTO);
  }

  @Get("/fetch/:taskID")
  async fetchTask(@Req() req: Request, @Param("taskID") taskID: string) {
    await AuthServices.throwErrorIfTaskDoesNotExist(Number(taskID));
    const userUUID = req.body.uuid;
    const fetchTaskDTO = new GeneralTaskDTO(taskID, userUUID);
    return await taskApplication.fetchTask(fetchTaskDTO);
  }

  @Post("/update/:taskID")
  async updateTask(@Req() req: Request, @Param("taskID") taskID: string) {
    await AuthServices.throwErrorIfTaskDoesNotExist(Number(taskID));
    const userUUID = req.body.uuid;
    const { name, completed, dueDate } = req.body;
    const updateTaskDTO = new UpdateTaskDTO(
      taskID,
      userUUID,
      name,
      completed,
      dueDate
    );
    return await taskApplication.updateTask(updateTaskDTO);
  }

  @Delete("/delete/:taskID")
  async deleteTask(@Req() req: Request, @Param("taskID") taskID: string) {
    await AuthServices.throwErrorIfTaskDoesNotExist(Number(taskID));
    const userUUID = req.body.uuid;
    const deleteTaskDTO = new GeneralTaskDTO(taskID, userUUID);
    return await taskApplication.deleteTask(deleteTaskDTO);
  }

  @Get("/fetchAll")
  async fetchAllTasks(
    @Req() req: Request,
    @Query("page") page: string,
    @Query("perPage") perPage: string
  ) {
    const userUUID = req.body.uuid;
    const fetchAllTasksDTO = new FetchAllTasksDTO(page, perPage, userUUID);
    return await taskApplication.fetchAllTasks(fetchAllTasksDTO);
  }
}
