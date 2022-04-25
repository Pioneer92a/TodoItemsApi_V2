import { container } from "tsyringe";
import { TaskDomain } from "../domain/services/taskDomain";
import { UserDomain } from "../domain/services/userDomain";
import { TaskRepository } from "./repository/taskRepository";
import { UserRepository } from "./repository/userRepository";

container.register("UserRepositoryI", {
  useClass: UserRepository,
});

container.register("TaskRepositoryI", {
  useClass: TaskRepository,
});

container.register("TaskDomainI", {
  useClass: TaskDomain,
});

container.register("UserDomainI", {
  useClass: UserDomain,
});

export { container };
