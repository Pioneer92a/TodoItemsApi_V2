import { UserApplicationService } from "../../application/userApplication";
import { ControllerService } from "../services/controller-service";
import { container } from "../../infrastructure/container";

const userApplicationService = container.resolve(UserApplicationService);

interface UserControllerI {
  logoutUser(req, res);
  getUserDetails(req, res);
  deleteUser(req, res);
  findOrCreateUser(req, res);
}

// BASIC OPERATIONS:
// create payload. pass it on to application layer.
// handle the response later on

export class UserController implements UserControllerI {
  async findOrCreateUser(req, res) {
    try {
      const user = await userApplicationService.findOrCreateUser(req);
      ControllerService.handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }

  async logoutUser(req, res) {
    try {
      const user = await userApplicationService.logoutUser(req);
      ControllerService.handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }

  async getUserDetails(req, res) {
    try {
      const user = await userApplicationService.findUser(req);
      ControllerService.handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const user = await userApplicationService.deleteUser(req);
      ControllerService.handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      ControllerService.handleError(e, res);
    }
  }
}
