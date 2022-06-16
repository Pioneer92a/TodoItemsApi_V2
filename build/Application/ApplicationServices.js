"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrorUfUserNotFoundByEmail = exports.checkIfTaskExists = void 0;
async function checkIfTaskExists(taskId, taskRepository) {
    const _task = await taskRepository.fetchTask(taskId);
    if (!_task)
        throw new Error("task does not exist");
}
exports.checkIfTaskExists = checkIfTaskExists;
async function throwErrorUfUserNotFoundByEmail(email, userRepository) {
    if (!(await userRepository.fetchUserbyEmail(email)))
        throw new Error(`user having following email not found: ${email}`);
}
exports.throwErrorUfUserNotFoundByEmail = throwErrorUfUserNotFoundByEmail;
//# sourceMappingURL=ApplicationServices.js.map