import { TaskApplicationService } from "../../application/taskService";
const taskApplicationService = new TaskApplicationService();

interface TaskControllersI {
  createNewTask(req, res);
  deleteTask(req, res);
  getTask(req, res);
  updateTask(req, res);
}

export class TaskControllers implements TaskControllersI {
  async createNewTask(req, res) {
    let newTask;
    try {
      newTask = await taskApplicationService.createNewTask(req);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if task FOUND ??
    if (!newTask) res.status(404).send({ msg: "something went wrong !!!" });
    else res.status(200).send({ msg: "new task created", newTask });
  }

  async deleteTask(req, res) {
    let task;
    try {
      const payload = { taskId: req.params.id, uuid: req.uuid }; // create payload
      task = await taskApplicationService.deleteTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if task FOUND ??
    if (!task) res.status(404).send({ msg: "something went wrong !!!" });
    else res.status(200).send({ msg: "task deleted:", task });
  }

  async getTask(req, res) {
    let task;
    try {
      const payload = { taskId: req.params.id, uuid: req.uuid }; // create payload
      task = await taskApplicationService.getTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if task FOUND ??
    if (!task) res.status(404).send({ msg: "something went wrong !!!" });
    else res.status(200).send({ msg: "task found:", task });
  }

  async updateTask(req, res) {
    let updateTask;
    try {
      const payload = { taskId: req.params.id, uuid: req.uuid }; // create payload
      updateTask = await taskApplicationService.updateTask(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    // check if task FOUND ??
    if (!updateTask) res.status(404).send({ msg: "something went wrong !!!" });
    else res.status(200).send({ msg: "task found:", updateTask });
  }
}
