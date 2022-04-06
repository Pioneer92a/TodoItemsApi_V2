"use strict";
exports.__esModule = true;
exports.Entity = void 0;
var uuid_1 = require("uuid");
// static factory method
var Entity = /** @class */ (function () {
    function Entity() {
    }
    Entity.createUser = function (payload) {
        var _user = new user(payload);
        return _user;
    };
    Entity.createTask = function (payload) {
        var _task = new task(payload);
        return _task;
    };
    return Entity;
}());
exports.Entity = Entity;
// user entity
var user = /** @class */ (function () {
    function user(newUser) {
        this.name = newUser.name;
        this.email = newUser.email;
        this.uuid = (0, uuid_1.v1)(); // generate uuid
        this.password = newUser.password;
    }
    return user;
}());
// task entity
var task = /** @class */ (function () {
    function task(newTask) {
        this.name = newTask.body.name;
        this.userUUID = newTask.uuid;
        this.uuid = (0, uuid_1.v1)(); // generate uuid
    }
    return task;
}());
