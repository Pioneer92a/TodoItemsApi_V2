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
exports.TaskDomainServices = void 0;
var user_1 = require("../infrastructure/db/user");
var taskStore_1 = require("../infrastructure/stores/taskStore");
var entity_1 = require("./entity");
var userRepository = new user_1.UserRepository();
var taskStore = new taskStore_1.TaskStore();
var TaskDomainServices = /** @class */ (function () {
    function TaskDomainServices() {
    }
    // this function creates a new task after applying the domain rules
    TaskDomainServices.prototype.createNewTask = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, taskEntity, newTaskCreated, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userRepository.findUserbyUUID(payload.uuid.toString())];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        taskEntity = entity_1.Entity.createTask(payload);
                        return [4 /*yield*/, taskStore.add(taskEntity)];
                    case 2:
                        newTaskCreated = _a.sent();
                        return [2 /*return*/, newTaskCreated];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskDomainServices.prototype.getTask = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, getTask, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, userRepository.findUserbyUUID(payload.uuid.toString())];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, taskStore.fetch(payload.taskId)];
                    case 2:
                        getTask = _a.sent();
                        return [2 /*return*/, getTask];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TaskDomainServices.prototype.updateTask = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, getTask, updateTask, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userRepository.findUserbyUUID(payload.uuid.toString())];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, taskStore.fetch(payload.taskId)];
                    case 2:
                        getTask = _a.sent();
                        if (!getTask)
                            return [2 /*return*/, null]; // return if the task doesn't exist
                        return [4 /*yield*/, taskStore.update(payload.taskId)];
                    case 3:
                        updateTask = _a.sent();
                        return [2 /*return*/, updateTask];
                    case 4:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TaskDomainServices.prototype.deleteTask = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, getTask, deletedTask, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, userRepository.findUserbyUUID(payload.uuid.toString())];
                    case 1:
                        _user = _a.sent();
                        if (!_user || !_user.token)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, taskStore.fetch(payload.taskId)];
                    case 2:
                        getTask = _a.sent();
                        if (!getTask)
                            return [2 /*return*/, null]; // return if the task doesn't exist
                        return [4 /*yield*/, taskStore.remove(payload.taskId)];
                    case 3:
                        deletedTask = _a.sent();
                        return [2 /*return*/, deletedTask];
                    case 4:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return TaskDomainServices;
}());
exports.TaskDomainServices = TaskDomainServices;