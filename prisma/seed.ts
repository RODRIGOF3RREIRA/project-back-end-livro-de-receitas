import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function seed() {
  await client.type.createMany({
    data: [
      {
        id: 1,
        name: 'Doce',
      },
      {
        id: 2,
        name: 'Salgado',
      },
      {
        id: 3,
        name: 'Fast-Food',
      },
    ],
  });
}

seed();
