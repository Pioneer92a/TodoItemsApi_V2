import { UserApplicationService } from "../../application/userService";
import { ControllerService } from "../services/controller-service";
const userApplicationService = new UserApplicationService();

interface UserControllersI {
  // createNewUser(req, res);
  // loginUser(req, res);
  logoutUser(req, res);
  getUserDetails(req, res);
  deleteUser(req, res);
  // updateUser(req, res);
  findOrCreateUser(req, res);
}

// BASIC OPERATIONS:
// create payload. pass it on to application layer.
// handle the response later on

export class UserControllers implements UserControllersI {
  async findOrCreateUser(req, res) {
    const payload = ControllerService.createPayloadForUser(req);

    let user;
    try {
      user = await userApplicationService.findOrCreateUser(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponseForUser(user, res);
  }

  async logoutUser(req, res) {
    const payload = ControllerService.createPayloadForUser(req);
    let user;
    try {
      user = await userApplicationService.logoutUser(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponseForUser(user, res);
  }

  async getUserDetails(req, res) {
    const payload = ControllerService.createPayloadForUser(req);
    let user;

    try {
      // wait for user details
      user = await userApplicationService.findUser(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponseForUser(user, res);
  }

  async deleteUser(req, res) {
    const payload = ControllerService.createPayloadForUser(req);
    let user;

    try {
      user = await userApplicationService.deleteUser(payload);
    } catch (e) {
      res.status(400).send(e);
    }

    ControllerService.handleResponseForUser(user, res);
  }
}
