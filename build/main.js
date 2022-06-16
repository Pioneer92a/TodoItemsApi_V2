"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const Config_1 = require("./Infrastructure/Cross-Cutting/Config");
const app_module_1 = require("./Presentation/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(Config_1.port);
}
bootstrap();
//# sourceMappingURL=main.js.map