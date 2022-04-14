import { UserApplicationService } from "../../application/userService";
import { ControllerService } from "../services/controller-service";
const userApplicationService = new UserApplicationService();

interface UserControllersI {
  logoutUser(req, res);
  getUserDetails(req, res);
  deleteUser(req, res);
  findOrCreateUser(req, res);
}

// BASIC OPERATIONS:
// create payload. pass it on to application layer.
// handle the response later on

export class UserControllers implements UserControllersI {
  async findOrCreateUser(req, res) {
    try {
      const user = await userApplicationService.findOrCreateUser(req);
      ControllerService.handleResponseForUser(user, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }

  async logoutUser(req, res) {
    try {
      const user = await userApplicationService.logoutUser(req);
      ControllerService.handleResponseForUser(user, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }

  async getUserDetails(req, res) {
    try {
      const user = await userApplicationService.findUser(req);
      ControllerService.handleResponseForUser(user, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await userApplicationService.deleteUser(req);
      ControllerService.handleResponseForUser(user, res);
    } catch (e) {
      console.log(e);
      return res.status(400).send(e.message);
    }
  }
}
