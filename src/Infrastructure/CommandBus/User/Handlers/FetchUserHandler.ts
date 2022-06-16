import { UserApplication } from "@app/User/UserApplication";
import FetchUserCommand from "@infra/CommandBus/User/Commands/FetchUserCommand";
import { container } from "tsyringe";
const userApplication = container.resolve(UserApplication);

class FetchUserHandler {
  async handle(command: FetchUserCommand) {
    return await userApplication.fetchUserbyUUID(command);
  }
}

export default FetchUserHandler;
