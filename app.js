const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alicddde@prismas.io',
      tasks: {
        create: { name: 'Hello Worldssss' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      tasks: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })