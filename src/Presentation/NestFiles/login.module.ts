import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./google.strategy";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService, GoogleStrategy],
})
export class LoginModule {}
