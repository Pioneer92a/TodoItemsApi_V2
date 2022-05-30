import { container } from "tsyringe";
import { UserApplication } from "../../../../Application/User/UserApplication";
import FindOrAddUserCommand from "../Commands/FindOrAddUserCommand";
const userApplication = container.resolve(UserApplication);

class FindOrAddUserHandler {
  async handle(command: FindOrAddUserCommand) {
    return await userApplication.findOrAddUser(command);
  }
}

export default FindOrAddUserHandler;
