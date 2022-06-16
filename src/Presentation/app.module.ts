import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "src/Presentation/Middleware/logger.middleware";
import { TaskController } from "src/Presentation/Task/task.controller";
import { TaskModule } from "src/Presentation/Task/task.module";
import { UserController } from "src/Presentation/User/user.controller";
import { UserModule } from "src/Presentation/User/user.module";

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
