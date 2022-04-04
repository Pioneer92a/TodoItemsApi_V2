"use strict";
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
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
exports.loginUser = exports.deleteUser = exports.getUserDetails = exports.createNewUser = exports.logoutUser = void 0;
var userService_1 = require("../../application/userService");
function createNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userService_1.userService.createNewUser(req.body)];
                case 1:
                    newUser = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    res.status(400).send(e_1);
                    return [3 /*break*/, 3];
                case 3:
                    // check if USER FOUND ??
                    if (!newUser)
                        res.status(404).send({ msg: "user not found !!!" });
                    else
                        res.status(200).send({ msg: "New user creation performed", newUser: newUser });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createNewUser = createNewUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var loginUser, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userService_1.userService.loginUser(req.body)];
                case 1:
                    loginUser = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    res.status(400).send(e_2);
                    return [3 /*break*/, 3];
                case 3:
                    // check if USER FOUND ??
                    if (!loginUser)
                        res.status(404).send({ msg: "user not found !!!" });
                    else
                        res.status(200).send({ msg: "Login performed", loginUser: loginUser });
                    return [2 /*return*/];
            }
        });
    });
}
exports.loginUser = loginUser;
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var logoutUser, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userService_1.userService.logoutUser(req.uuid)];
                case 1:
                    logoutUser = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    res.status(400).send(e_3);
                    return [3 /*break*/, 3];
                case 3:
                    // check if USER FOUND ??
                    if (!logoutUser)
                        res.status(404).send({ msg: "user not found !!!" });
                    else
                        res.status(200).send({ msg: "Logout performed", logoutUser: logoutUser });
                    return [2 /*return*/];
            }
        });
    });
}
exports.logoutUser = logoutUser;
// async function AllUsersLogout(req, res) {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.status(200).send();
//   } catch (e) {
//     res.status(500).send();
//   }
// }
function getUserDetails(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userService_1.userService.findUser(req.uuid)];
                case 1:
                    // wait for user details
                    user = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    res.status(400).send(e_4);
                    return [3 /*break*/, 3];
                case 3:
                    // check if USER FOUND ??
                    if (!user)
                        res.status(404).send({ msg: "user not found !!!" });
                    else
                        res.status(200).send({ msg: "user found:", user: user });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserDetails = getUserDetails;
// async function updateUser(req, res) {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     return res.status(401).send({ error: "Invalid updates" });
//   }
//   try {
//     updates.forEach((update) => {
//       req.user[update] = req.body[update];
//     });
//     await req.user.save();
//     return res.status(201).send(req.user);
//   } catch (e) {
//     return res.status(404).send({
//       e,
//     });
//   }
// }
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userService_1.userService.deleteUser(req.uuid)];
                case 1:
                    user = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    res.status(400).send(e_5);
                    return [3 /*break*/, 3];
                case 3:
                    // check if USER FOUND ??
                    if (!user)
                        res.status(404).send({ msg: "user not found !!!" });
                    else
                        res.status(200).send({ msg: "user deleted:", user: user });
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
