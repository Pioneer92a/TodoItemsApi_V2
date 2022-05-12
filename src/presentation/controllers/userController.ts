import { UserApplication } from "../../Application/UserApplication";
import { container } from "../../Infrastructure/Container";
import {
  createUserPayload,
  handleError,
  handleUserResponse,
  userPayloadType,
} from "../Services/ControllerServices";

const userApplication = container.resolve(UserApplication);

/**
 * prepares input data for application layer and handles response
 */
export class UserController {
  async findOrAddUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.findOrCreate);
      const user = await userApplication.findOrAddUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async logoutUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.generalPurpose);
      const user = await userApplication.logoutUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async fetchUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.generalPurpose);
      const user = await userApplication.fetchUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.generalPurpose);
      const user = await userApplication.deleteUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }
}
