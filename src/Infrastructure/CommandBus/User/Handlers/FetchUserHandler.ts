import { container } from "tsyringe";
import { UserApplication } from "../../../../Application/User/UserApplication";
import FetchUserCommand from "../Commands/FetchUserCommand";
const userApplication = container.resolve(UserApplication);

class FetchUserHandler {
  async handle(command: FetchUserCommand) {
    return await userApplication.fetchUserbyUUID(command);
  }
}

export default FetchUserHandler;
