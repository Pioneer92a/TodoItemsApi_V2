import { UserApplication } from "@app/User/UserApplication";
import LogoutUserCommand from "@infra/CommandBus/User/Commands/LogoutUserCommand";
import { container } from "tsyringe";
const userApplication = container.resolve(UserApplication);

class LogoutUserHandler {
  async handle(command: LogoutUserCommand) {
    return await userApplication.logoutUser(command);
  }
}

export default LogoutUserHandler;
