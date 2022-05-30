import { Command } from "simple-command-bus";

class FetchUserCommand extends Command {
  uuid: string;
  constructor(uuid: string) {
    super();
    this.uuid = uuid;
  }
}

export default FetchUserCommand;
