import { Command } from "simple-command-bus";

class LogoutUserCommand extends Command {
  uuid: string;
  constructor(uuid: string) {
    super();
    this.uuid = uuid;
  }
}

export default LogoutUserCommand;
