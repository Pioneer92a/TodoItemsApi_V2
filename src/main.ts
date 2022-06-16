import { port } from "@infra/Cross-Cutting/Config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/Presentation/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
