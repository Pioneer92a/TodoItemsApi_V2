import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./Middleware/logger.middleware";
import { TaskController } from "./Task/task.controller";
import { TaskModule } from "./Task/task.module";
import { UserController } from "./User/user.controller";
import { UserModule } from "./User/user.module";

@Module({
  imports: [UserModule, TaskModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({
        path: "user/login",
        method: RequestMethod.GET,
      })
      .forRoutes(UserController, TaskController);
  }
}
