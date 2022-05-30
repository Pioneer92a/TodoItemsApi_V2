import { CommandBus } from "simple-command-bus";
import {
  FindOrAddUserDTO,
  GeneralUserDTO,
} from "../../Application/User/UserDTO";
import commandHandlerMiddleware from "../../Infrastructure/CommandBus/User/CommandHandlerMiddleware";
import DeleteUserCommand from "../../Infrastructure/CommandBus/User/Commands/DeleteUserCommand";
import FetchUserCommand from "../../Infrastructure/CommandBus/User/Commands/FetchUserCommand";
import FindOrAddUserCommand from "../../Infrastructure/CommandBus/User/Commands/FindOrAddUserCommand";
import LogoutUserCommand from "../../Infrastructure/CommandBus/User/Commands/LogoutUserCommand";
import {
  handleError,
  handleUserResponse,
} from "../Services/ControllerServices";
const commandBus = new CommandBus([commandHandlerMiddleware]);

export class UserController {
  async findOrAddUser(req, res) {
    try {
      const { name, email } = new FindOrAddUserDTO(req);
      const command = new FindOrAddUserCommand(name, email);
      const user = await commandBus.handle(command);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async logoutUser(req, res) {
    try {
      const { uuid } = new GeneralUserDTO(req);
      const command = new LogoutUserCommand(uuid);
      const user = await commandBus.handle(command);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async fetchUser(req, res) {
    try {
      const { uuid } = new GeneralUserDTO(req);
      const command = new FetchUserCommand(uuid);
      const user = await commandBus.handle(command);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }

  async deleteUser(req, res) {
    try {
      const { uuid } = new GeneralUserDTO(req);
      const command = new DeleteUserCommand(uuid);
      const user = await commandBus.handle(command);
      handleUserResponse(user, res);
    } catch (e) {
      handleError(e, res);
    }
  }
}
