import { TaskRepository } from "@infra/Repository/TaskRepository";
import { UserRepository } from "@infra/Repository/UserRepository";
import { container } from "tsyringe";

container.register("UserRepositoryI", {
  useClass: UserRepository,
});

container.register("TaskRepositoryI", {
  useClass: TaskRepository,
});

export { container };
