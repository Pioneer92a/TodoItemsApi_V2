import { Module } from "@nestjs/common";
import { TaskController } from "src/Presentation/Task/task.controller";

@Module({
  controllers: [TaskController],
})
export class TaskModule {}
