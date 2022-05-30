import { container } from "tsyringe";
import { UserApplication } from "../../../../Application/User/UserApplication";
import LogoutUserCommand from "../Commands/LogoutUserCommand";
const userApplication = container.resolve(UserApplication);

class LogoutUserHandler {
  async handle(command: LogoutUserCommand) {
    return await userApplication.logoutUser(command);
  }
}

export default LogoutUserHandler;
