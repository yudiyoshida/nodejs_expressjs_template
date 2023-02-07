import DataSource from '@database/data-source';
import { Prisma } from '@prisma/client';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.faq;
  }

  public async findAll(limit: number, page: number) {
    return DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count(),
    ]);
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
    });
  }

  public async create(data: Prisma.FaqCreateInput) {
    return this.repository.create({
      data,
    });
  }

  public async update(id: number, data: Prisma.FaqUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
    });
  }

  public async delete(id: number) {
    return this.repository.delete({
      where: { id },
    });
  }
}

export default new Service();
