// this file is used to provide seed/fake data to the database

import { PrismaClient } from "@prisma/client";
import * as faker from "faker";
import { SEED_DATA_LIMIT } from "../../Config";
const prisma = new PrismaClient();

const seedDataLimit = parseInt(SEED_DATA_LIMIT);

async function main() {
  for (let index = 0; index < seedDataLimit; index++) {
    const email = faker.internet.email();
    await prisma.user.upsert({
      where: { email: email },
      update: {},
      create: {
        email: email,
        name: faker.name.firstName(),
        uuid: faker.datatype.uuid(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
