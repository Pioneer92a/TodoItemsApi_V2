"use strict";
exports.__esModule = true;
exports.UserService = void 0;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.createUserEntity = function (user) {
        var newUserEntity = {
            name: user.name,
            email: user.email,
            uuid: user.uuid,
            password: user.password,
            token: user.token
        };
        return newUserEntity;
    };
    return UserService;
}());
exports.UserService = UserService;
