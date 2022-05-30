import { Command } from "simple-command-bus";

class DeleteUserCommand extends Command {
  uuid: string;
  constructor(uuid: string) {
    super();
    this.uuid = uuid;
  }
}

export default DeleteUserCommand;