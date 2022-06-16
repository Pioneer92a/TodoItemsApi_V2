import { container } from "tsyringe";
import { UserApplication } from "@app/User/UserApplication";
import FindOrAddUserCommand from "@infra/CommandBus/User/Commands/FindOrAddUserCommand";
const userApplication = container.resolve(UserApplication);

class FindOrAddUserHandler {
  async handle(command: FindOrAddUserCommand) {
    return await userApplication.loginOrAddUser(command);
  }
}

export default FindOrAddUserHandler;
