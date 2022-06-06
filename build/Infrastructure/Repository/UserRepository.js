"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const EntityFactory_1 = require("../../Domain/EntityFactory");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async logout(userUUID) {
        try {
            const user = await prisma.user.update({
                where: {
                    uuid: userUUID,
                },
                data: {
                    isLoggedIn: false,
                },
            });
            return EntityFactory_1.EntityFactory.createUser(user.uuid, user.name, user.email);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async login(userEmail) {
        try {
            const user = await prisma.user.update({
                where: {
                    email: userEmail,
                },
                data: {
                    isLoggedIn: true,
                },
            });
            return EntityFactory_1.EntityFactory.createUser(user.uuid, user.name, user.email);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async addNewUser(newUser) {
        try {
            const user = await prisma.user.create({
                data: {
                    uuid: newUser.uuid,
                    email: newUser.email,
                    name: newUser.name,
                    isLoggedIn: true,
                },
            });
            return EntityFactory_1.EntityFactory.createUser(user.uuid, user.name, user.email);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async fetchUserbyUUID(userUUID) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    uuid: userUUID,
                },
            });
            return EntityFactory_1.EntityFactory.createUser(user.uuid, user.name, user.email);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async fetchUserLoginStatus(userUUID) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    uuid: userUUID,
                },
            });
            if (!user)
                return null;
            else
                return user.isLoggedIn;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async fetchUserbyEmail(userEmail) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: userEmail,
                },
            });
            if (!user)
                return null;
            else
                return EntityFactory_1.EntityFactory.createUser(user.uuid, user.name, user.email);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async deleteUser(userUUID) {
        try {
            const userToDelete = await prisma.user.findUnique({
                where: {
                    uuid: userUUID,
                },
            });
            if (!userToDelete)
                return null;
            const deleteTasks = prisma.task.deleteMany({
                where: {
                    userId: userToDelete.id,
                },
            });
            const deleteUser = prisma.user.delete({
                where: {
                    uuid: userUUID,
                },
            });
            const transaction = await prisma.$transaction([deleteTasks, deleteUser]);
            return EntityFactory_1.EntityFactory.createUser(transaction[1].uuid, transaction[1].name, transaction[1].email);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map