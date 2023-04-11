import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';
import { seedTexts } from './text';

const prisma = new PrismaClient();
async function main() {
  await seedAdmin(prisma);
  await seedTexts(prisma);
}

main()
.catch((e) => {
  console.error(e);
  process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
