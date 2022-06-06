import { NestFactory } from "@nestjs/core";
import { port } from "./Infrastructure/Cross-Cutting/Config";
import { AppModule } from "./Presentation/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
