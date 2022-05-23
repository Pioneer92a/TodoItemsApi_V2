import { UserApplication } from "../../Application/User/UserApplication";
import {
  FindOrAddUserDTO,
  GeneralUserDTO,
} from "../../Application/User/UserDTO";
import { container } from "../../Infrastructure/Cross-Cutting/Container";
import {
  handleError,
  handleUserResponse,
} from "../Services/ControllerServices";

const userApplication = container.resolve(UserApplication);

/**
 * prepares input data for application layer and handles response
 */
export class UserController {
  async findOrAddUser(req, res) {
    try {
      const findOrAddUserDTO = new FindOrAddUserDTO(
        req.user.name.givenName,
        req.user.emails[0].value
      );
      const user = await userApplication.findOrAddUser(findOrAddUserDTO);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async logoutUser(req, res) {
    try {
      const logoutUserDTO = new GeneralUserDTO(req.params.uuid);
      const user = await userApplication.logoutUser(logoutUserDTO);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async fetchUser(req, res) {
    try {
      const fetchUserDTO = new GeneralUserDTO(req.params.uuid);
      const user = await userApplication.fetchUserbyUUID(fetchUserDTO);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const deleteUserDTO = new GeneralUserDTO(req.params.uuid);
      const user = await userApplication.deleteUser(deleteUserDTO);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }
}
