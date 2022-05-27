// this file is used to provide seed/fake data to the database

import { PrismaClient } from "@prisma/client";
import * as faker from "faker";
import { logger } from "../../../Infrastructure/Cross-Cutting/LoggerService";
import { SEED_DATA_LIMIT } from "../../Cross-Cutting/Config";
const prisma = new PrismaClient();

const seedDataLimit = parseInt(SEED_DATA_LIMIT);

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
  // append my own username at end
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

// add tasks to my own username

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
