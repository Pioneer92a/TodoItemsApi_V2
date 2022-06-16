"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker = require("faker");
const LoggerService_1 = require("../../Cross-Cutting/LoggerService");
const Config_1 = require("../../Cross-Cutting/Config");
const prisma = new client_1.PrismaClient();
const seedDataLimit = parseInt(Config_1.SEED_DATA_LIMIT);
async function main() {
    for (let index = 0; index < seedDataLimit; index++) {
        const _email = faker.internet.email();
        const _name = faker.name.firstName();
        const _uuid = faker.datatype.uuid();
        await prisma.user.upsert({
            where: { email: _email },
            update: {},
            create: {
                email: _email,
                name: _name,
                uuid: _uuid,
            },
        });
    }
    await prisma.user.upsert({
        where: { email: "shahzaib.atif@carbonteq.com" },
        update: {},
        create: {
            email: "shahzaib.atif@carbonteq.com",
            name: "Shahzaib",
            uuid: faker.datatype.uuid(),
        },
    });
    for (let index = 0; index < 45; index++) {
        await prisma.task.create({
            data: {
                uuid: faker.datatype.uuid(),
                name: `task no. ${index + 1}`,
                dueDate: faker.date.soon(14),
                user: {
                    connectOrCreate: {
                        where: {
                            email: "shahzaib.atif@carbonteq.com",
                        },
                        create: {
                            email: "UserNotFound@prisma.io",
                            name: "UserNotFound",
                            uuid: "UserNotFound",
                            isLoggedIn: true,
                        },
                    },
                },
            },
            include: {
                user: true,
            },
        });
    }
}
main()
    .catch((e) => {
    LoggerService_1.logger.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map