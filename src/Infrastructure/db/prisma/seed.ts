// this file is used to provide seed/fake data to the database

import { PrismaClient } from "@prisma/client";
import * as faker from "faker";
import { SEED_DATA_LIMIT } from "../../Cross-Cutting/Config";
import { logger } from "../../Cross-Cutting/LoggerService";
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
}

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
