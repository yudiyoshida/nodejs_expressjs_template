import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class FaqSetup {
  public async dropFaqDatabase() {
    await prisma.faq.deleteMany({ where: {} });
  }

  public async createFaq(data: Prisma.FaqCreateInput) {
    return await prisma.faq.create({
      data,
    });
  }

  public async createFaqs(data: Prisma.FaqCreateInput[]) {
    return await prisma.faq.createMany({
      data,
    });
  }
}

export default new FaqSetup();
