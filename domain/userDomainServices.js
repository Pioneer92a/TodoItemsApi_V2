"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserDomainServices = void 0;
var user_1 = require("../infrastructure/db/user");
var userStore_1 = require("../infrastructure/stores/userStore");
var jwt = require("jsonwebtoken"); // For user authentication;
var config_1 = require("../infrastructure/config");
var entity_1 = require("./entity");
var userRepository = new user_1.UserRepository();
var userStore = new userStore_1.UserStore();
var UserDomainServices = /** @class */ (function () {
    function UserDomainServices() {
    }
    UserDomainServices.prototype.createNewUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var userEntity, newUserCreated, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userEntity = entity_1.Entity.createUser(payload);
                        return [4 /*yield*/, userStore.add(userEntity)];
                    case 1:
                        newUserCreated = _a.sent();
                        return [2 /*return*/, newUserCreated];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDomainServices.prototype.loginUser = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var userFound, token, user, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, userRepository.findUserbyEmail(payload.email)];
                    case 1:
                        userFound = _a.sent();
                        if (!(userFound !== null && userFound.password === payload.password)) return [3 /*break*/, 3];
                        token = jwt.sign({ uuid: userFound.uuid.toString() }, config_1.JWT_SECRET);
                        return [4 /*yield*/, userRepository.addTokenToUser(payload, token)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3: return [2 /*return*/, null];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserDomainServices.prototype.logoutUser = function (userUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, user, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userRepository.findUserbyUUID(userUUID)];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, userRepository.removeTokenFromUser(userUUID)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // find user by their UUID
    UserDomainServices.prototype.findUserbyUUID = function (userUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userStore.fetch(userUUID)];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        // return null if user or its token is not found ... it means user has either logged out or deleted
                        // this logic may later be moved to a higher layer of domain
                        return [2 /*return*/, _user];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDomainServices.prototype.deleteUser = function (userUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userStore.remove(userUUID)];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        // return null if user or its token is not found ... it means user has either logged out or deleted
                        // this logic may later be moved to a higher layer of domain
                        return [2 /*return*/, _user];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserDomainServices.prototype.updateUser = function (userUUID) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userStore.update(userUUID)];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        // return null if user or its token is not found ... it means user has either logged out or deleted
                        // this logic may later be moved to a higher layer of domain
                        return [2 /*return*/, _user];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserDomainServices;
}());
exports.UserDomainServices = UserDomainServices;