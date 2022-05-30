import { container } from "tsyringe";
import { UserApplication } from "../../../../Application/User/UserApplication";
import DeleteUserCommand from "../Commands/DeleteUserCommand";
const userApplication = container.resolve(UserApplication);

class DeleteUserHandler {
  async handle(command: DeleteUserCommand) {
    return await userApplication.deleteUser(command);
  }
}

export default DeleteUserHandler;
