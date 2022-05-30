import { Command } from "simple-command-bus";

class FindOrAddUserCommand extends Command {
  name: string;
  email: string;
  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}

export default FindOrAddUserCommand;
