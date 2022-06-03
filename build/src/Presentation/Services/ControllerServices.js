"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleUserResponse = exports.handleTaskResponse = void 0;
const LoggerService_1 = require("../../Infrastructure/Cross-Cutting/LoggerService");
function handleTaskResponse(task, res) {
    if (task) {
        LoggerService_1.logger.info("task operation performed");
        return res.status(200).send({ msg: "task operation performed", task });
    }
}
exports.handleTaskResponse = handleTaskResponse;
function handleUserResponse(user, res) {
    if (user) {
        LoggerService_1.logger.info("user operation performed");
        return res.status(200).send({ msg: "user operation performed", user });
    }
}
exports.handleUserResponse = handleUserResponse;
function handleError(error, res) {
    LoggerService_1.logger.error(error);
    return res.status(400).send(error.message);
}
exports.handleError = handleError;
//# sourceMappingURL=ControllerServices.js.map