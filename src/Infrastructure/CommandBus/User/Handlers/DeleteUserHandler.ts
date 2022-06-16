import { UserApplication } from "@app/User/UserApplication";
import DeleteUserCommand from "@infra/CommandBus/User/Commands/DeleteUserCommand";
import { container } from "tsyringe";
const userApplication = container.resolve(UserApplication);

class DeleteUserHandler {
  async handle(command: DeleteUserCommand) {
    return await userApplication.deleteUser(command);
  }
}

export default DeleteUserHandler;
