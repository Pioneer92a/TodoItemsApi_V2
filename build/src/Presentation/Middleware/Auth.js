"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskAuth = exports.userAuth = exports.isLoggedInCb = void 0;
const AuthServices_1 = require("../Services/AuthServices");
const ControllerServices_1 = require("../Services/ControllerServices");
const isLoggedInCb = async (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.isLoggedInCb = isLoggedInCb;
const userAuth = async (req, res, next) => {
    try {
        const { _uuid } = AuthServices_1.default.decodeUUIDFromHeader(req);
        AuthServices_1.default.throwErrorIfNoUUID(_uuid);
        await AuthServices_1.default.throwErrorIfUserDoesNotExist(_uuid);
        await AuthServices_1.default.throwErrorIfUserNotLoggedIn(_uuid);
        req.params.uuid = _uuid;
        next();
    }
    catch (error) {
        (0, ControllerServices_1.handleError)(error, res);
    }
};
exports.userAuth = userAuth;
const taskAuth = async (req, res, next) => {
    try {
        const { _uuid } = AuthServices_1.default.decodeUUIDFromHeader(req);
        AuthServices_1.default.throwErrorIfNoUUID(_uuid);
        req.body.userUUID = _uuid;
        await AuthServices_1.default.throwErrorIfUserDoesNotExist(_uuid);
        await AuthServices_1.default.throwErrorIfUserNotLoggedIn(_uuid);
        if (req.originalUrl.includes("newtask") ||
            req.originalUrl.includes("getAllTasks")) {
            next();
        }
        else {
            await AuthServices_1.default.throwErrorIfTaskDoesNotExist(Number(req.params.id));
            next();
        }
    }
    catch (error) {
        (0, ControllerServices_1.handleError)(error, res);
    }
};
exports.taskAuth = taskAuth;
//# sourceMappingURL=Auth.js.map