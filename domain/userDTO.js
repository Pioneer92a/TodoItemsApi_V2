"use strict";
exports.__esModule = true;
exports.userDTO = void 0;
var uuid_1 = require("uuid");
// this class actually makes a real user entity
var userDTO = /** @class */ (function () {
    function userDTO(newUser) {
        this.name = newUser.name;
        this.email = newUser.email;
        this.uuid = (0, uuid_1.v1)(); // generate uuid
        // this.token = this.generateToken(); // generate a token
        this.password = newUser.password;
    }
    return userDTO;
}());
exports.userDTO = userDTO;
