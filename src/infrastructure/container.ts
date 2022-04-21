import { container } from "tsyringe";
import { TaskRepository } from "./repository/taskRepository";
import { UserRepository } from "./repository/userRepository";

container.register("UserRepositoryI", {
  useClass: UserRepository,
});

container.register("TaskRepositoryI", {
  useClass: TaskRepository,
});

export { container };
