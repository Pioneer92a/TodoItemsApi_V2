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
exports.UserApplication = void 0;
const Services_1 = require("../Services");
const EntityFactory_1 = require("../../Domain/EntityFactory");
const Config_1 = require("../../Infrastructure/Cross-Cutting/Config");
const jwt = require("jsonwebtoken");
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const uuid_1 = require("uuid");
let UserApplication = class UserApplication {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async loginOrAddUser(payload) {
        let user;
        if (await this.userRepository.fetchUserbyEmail(payload.email))
            user = await this.loginUser(payload);
        else
            user = await this.addUser(payload);
        const token = jwt.sign({ _uuid: user.uuid.toString() }, Config_1.JWT_SECRET);
        user.token = token;
        return user;
    }
    async addUser(payload) {
        const userEntity = EntityFactory_1.EntityFactory.createUser((0, uuid_1.v1)(), payload.name, payload.email);
        return await this.userRepository.addNewUser(userEntity);
    }
    async loginUser(payload) {
        await (0, Services_1.throwErrorUfUserNotFoundByEmail)(payload.email, this.userRepository);
        return await this.userRepository.login(payload.email);
    }
    async logoutUser(payload) {
        return await this.userRepository.logout(payload.uuid);
    }
    async fetchUserbyUUID(payload) {
        return await this.userRepository.fetchUserbyUUID(payload.uuid);
    }
    async deleteUser(payload) {
        return await this.userRepository.deleteUser(payload.uuid);
    }
};
UserApplication = __decorate([
    (0, tsyringe_1.autoInjectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepositoryI")),
    __metadata("design:paramtypes", [Object])
], UserApplication);
exports.UserApplication = UserApplication;
//# sourceMappingURL=UserApplication.js.map