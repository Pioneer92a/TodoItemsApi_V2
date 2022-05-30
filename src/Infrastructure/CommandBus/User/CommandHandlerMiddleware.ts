import {
  ClassNameExtractor,
  CommandHandlerMiddleware,
  HandleInflector,
  InMemoryLocator,
} from "simple-command-bus";
import DeleteUserHandler from "./Handlers/DeleteUserHandler";

import FetchUserHandler from "./Handlers/FetchUserHandler";
import FindOrAddUserHandler from "./Handlers/FindOrAddUserHandler";
import LogoutUserHandler from "./Handlers/LogoutUserHandler";

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
