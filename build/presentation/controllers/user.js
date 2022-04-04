"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserDetails = exports.AllUsersLogout = exports.userLogout = exports.createNewUser = void 0;
async function createNewUser(req, res) {
    res.status(200).send({ "message": "user creation route setup" });
}
exports.createNewUser = createNewUser;
async function userLogout(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.status(200).send();
    }
    catch (e) {
        res.status(500).send();
    }
}
exports.userLogout = userLogout;
async function AllUsersLogout(req, res) {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    }
    catch (e) {
        res.status(500).send();
    }
}
exports.AllUsersLogout = AllUsersLogout;
async function getUserDetails(req, res) {
    res.send(req.user);
}
exports.getUserDetails = getUserDetails;
async function updateUser(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(401).send({ error: 'Invalid updates' });
    }
    try {
        updates.forEach((update) => { req.user[update] = req.body[update]; });
        await req.user.save();
        return res.status(201).send(req.user);
    }
    catch (e) {
        return res.status(404).send({
            e,
        });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    try {
        await req.user.remove();
        res.send(req.user);
    }
    catch (err) {
        res.status(500).send({ e: 'Catch Error', err });
    }
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map