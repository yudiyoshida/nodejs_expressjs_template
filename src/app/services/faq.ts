import { Prisma } from '@prisma/client';
import { PrismaModel } from '@customTypes/prisma-model';
import DataSource from '@database/data-source';

class FaqService {
  private readonly repository: Prisma.FaqDelegate<PrismaModel>;

  constructor() {
    this.repository = DataSource.faq;
  }

  public async findAll(limit: number, page: number) {
    return await DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
      }),
      this.repository.count(),
    ]);
  }

  public async findById(id: number) {
    return await this.repository.findUnique({
      where: { id },
    });
  }

  public async create(data: Prisma.FaqCreateInput) {
    return await this.repository.create({
      data,
    });
  }

  public async update(id: number, data: Prisma.FaqCreateInput) {
    return await this.repository.update({
      where: { id },
      data,
    });
  }

  public async delete(id: number) {
    return await this.repository.delete({
      where: { id },
    });
  }
}

export default new FaqService();
