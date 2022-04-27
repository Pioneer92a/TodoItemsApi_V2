import { container } from "tsyringe";
import { TaskRepository } from "./Repository/TaskRepository";
import { UserRepository } from "./Repository/UserRepository";

container.register("UserRepositoryI", {
  useClass: UserRepository,
});

container.register("TaskRepositoryI", {
  useClass: TaskRepository,
});

// container.register("TaskDomainI", {
//   useClass: TaskDomain,
// });

// container.register("UserDomainI", {
//   useClass: UserDomain,
// });

export { container };

