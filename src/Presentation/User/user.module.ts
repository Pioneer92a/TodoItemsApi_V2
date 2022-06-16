import { Module } from "@nestjs/common";
import { UserController } from "src/Presentation/User/user.controller";

@Module({
  controllers: [UserController],
})
export class UserModule {}
