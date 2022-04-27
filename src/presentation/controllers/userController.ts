import { UserApplicationService } from "../../Application/UserApplication";
import { container } from "../../Infrastructure/container";
import { createUserPayload, handleError, handleUserResponse, userPayloadType } from "../Services/ControllerServices";

const userApplicationService = container.resolve(UserApplicationService);

/**
 * prepares input data for application layer and handles response
 */
export class UserController {
  async findOrCreateUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.findOrCreate);
      const user = await userApplicationService.findOrCreateUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async logoutUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.generalPurpose);
      const user = await userApplicationService.logoutUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async getUserDetails(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.generalPurpose);
      const user = await userApplicationService.getUserDetails(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const payload = createUserPayload(req, userPayloadType.generalPurpose);
      const user = await userApplicationService.deleteUser(payload);
      handleUserResponse(user, res);
    } catch (e) {
      console.log(e);
      handleError(e, res);
    }
  }
}
