import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";
import { LoginModule } from "./NestFiles/login.module";
import { UserModule } from "./User/user.module";

@Module({
  imports: [UserModule, LoginModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: "user/fetch", method: RequestMethod.GET },
        { path: "user/logout", method: RequestMethod.POST },
        { path: "user/delete", method: RequestMethod.DELETE }
      );
  }
}
