"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const logger_middleware_1 = require("./logger.middleware");
const login_module_1 = require("./NestFiles/login.module");
const user_module_1 = require("./User/user.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: "user/fetch", method: common_1.RequestMethod.GET }, { path: "user/logout", method: common_1.RequestMethod.POST }, { path: "user/delete", method: common_1.RequestMethod.DELETE });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, login_module_1.LoginModule],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map