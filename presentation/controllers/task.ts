// const Task = require('../../infrastructure/db/model/task'); // import task model
import { taskService } from "../../application/taskService";

async function createNewTask(req, res) {
  let newTask;
  try {
    newTask = await taskService.createNewTask(req);
  } catch (e) {
    res.status(400).send(e);
  }
  res.status(200).send({ msg: "new task created", newTask });
}

async function deleteTask(req, res) {
  let task;
  try {
    task = await taskService.deleteTask(req.params.id);
  } catch (e) {
    res.status(400).send(e);
  }
  res.status(200).send({ msg: "task deleted:", task });
}

async function getTask(req, res) {
  let task;
  try {
    task = await taskService.getTask(req.params.id);
  } catch (e) {
    res.status(400).send(e);
  }

  res.status(200).send({ msg: "task found:", task });
}

export { createNewTask, deleteTask, getTask };
