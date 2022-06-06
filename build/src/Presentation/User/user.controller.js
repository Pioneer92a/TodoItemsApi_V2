"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const UserApplication_1 = require("../../Application/User/UserApplication");
const UserDTO_1 = require("../../Application/User/UserDTO");
const Container_1 = require("../../Infrastructure/Cross-Cutting/Container");
const user_service_1 = require("./user.service");
const userApplication = Container_1.container.resolve(UserApplication_1.UserApplication);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async fetchUser(req) {
        const { uuid } = req.body;
        const fetchUserDTO = new UserDTO_1.GeneralUserDTO(uuid);
        return await userApplication.fetchUserbyUUID(fetchUserDTO);
    }
    async loginOrAddUser(req) {
        const { name, email } = req.body;
        const findOrAddUserDTO = new UserDTO_1.LoginOrAddUserDTO(name, email);
        return await userApplication.findOrAddUser(findOrAddUserDTO);
    }
    async logoutUser(req) {
        const { uuid } = req.body;
        const logoutUserDTO = new UserDTO_1.GeneralUserDTO(uuid);
        return await userApplication.logoutUser(logoutUserDTO);
    }
    async deleteUser(req) {
        const { uuid } = req.body;
        const deleteUserDTO = new UserDTO_1.GeneralUserDTO(uuid);
        return await userApplication.deleteUser(deleteUserDTO);
    }
};
__decorate([
    (0, common_1.Get)("/fetch"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "fetchUser", null);
__decorate([
    (0, common_1.Get)("/login"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginOrAddUser", null);
__decorate([
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logoutUser", null);
__decorate([
    (0, common_1.Delete)("/delete"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map