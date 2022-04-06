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
exports.TaskControllers = void 0;
var taskService_1 = require("../../application/taskService");
var taskApplicationService = new taskService_1.TaskApplicationService();
var TaskControllers = /** @class */ (function () {
    function TaskControllers() {
    }
    TaskControllers.prototype.createNewTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newTask, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, taskApplicationService.createNewTask(req)];
                    case 1:
                        newTask = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        res.status(400).send(e_1);
                        return [3 /*break*/, 3];
                    case 3:
                        // check if task FOUND ??
                        if (!newTask)
                            res.status(404).send({ msg: "something went wrong !!!" });
                        else
                            res.status(200).send({ msg: "new task created", newTask: newTask });
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskControllers.prototype.deleteTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var task, payload, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = { taskId: req.params.id, uuid: req.uuid };
                        return [4 /*yield*/, taskApplicationService.deleteTask(payload)];
                    case 1:
                        task = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        res.status(400).send(e_2);
                        return [3 /*break*/, 3];
                    case 3:
                        // check if task FOUND ??
                        if (!task)
                            res.status(404).send({ msg: "something went wrong !!!" });
                        else
                            res.status(200).send({ msg: "task deleted:", task: task });
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskControllers.prototype.getTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var task, payload, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = { taskId: req.params.id, uuid: req.uuid };
                        return [4 /*yield*/, taskApplicationService.getTask(payload)];
                    case 1:
                        task = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        res.status(400).send(e_3);
                        return [3 /*break*/, 3];
                    case 3:
                        // check if task FOUND ??
                        if (!task)
                            res.status(404).send({ msg: "something went wrong !!!" });
                        else
                            res.status(200).send({ msg: "task found:", task: task });
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskControllers.prototype.updateTask = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updateTask, payload, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        payload = { taskId: req.params.id, uuid: req.uuid };
                        return [4 /*yield*/, taskApplicationService.updateTask(payload)];
                    case 1:
                        updateTask = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        res.status(400).send(e_4);
                        return [3 /*break*/, 3];
                    case 3:
                        // check if task FOUND ??
                        if (!updateTask)
                            res.status(404).send({ msg: "something went wrong !!!" });
                        else
                            res.status(200).send({ msg: "task found:", updateTask: updateTask });
                        return [2 /*return*/];
                }
            });
        });
    };
    return TaskControllers;
}());
exports.TaskControllers = TaskControllers;
