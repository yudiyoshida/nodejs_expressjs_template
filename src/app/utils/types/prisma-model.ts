import { Prisma } from '@prisma/client';

type PrismaModel = Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined

export { PrismaModel };
