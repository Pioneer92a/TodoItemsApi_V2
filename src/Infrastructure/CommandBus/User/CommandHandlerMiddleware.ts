import DeleteUserHandler from "@infra/CommandBus/User/Handlers/DeleteUserHandler";
import {
  ClassNameExtractor,
  CommandHandlerMiddleware,
  HandleInflector,
  InMemoryLocator,
} from "simple-command-bus";

import FetchUserHandler from "@infra/CommandBus/User/Handlers/FetchUserHandler";
import FindOrAddUserHandler from "@infra/CommandBus/User/Handlers/FindOrAddUserHandler";
import LogoutUserHandler from "@infra/CommandBus/User/Handlers/LogoutUserHandler";

const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    FetchUserHandler: new FetchUserHandler(),
    LogoutUserHandler: new LogoutUserHandler(),
    DeleteUserHandler: new DeleteUserHandler(),
    FindOrAddUserHandler: new FindOrAddUserHandler(),
  }),
  new HandleInflector()
);

export default commandHandlerMiddleware;
