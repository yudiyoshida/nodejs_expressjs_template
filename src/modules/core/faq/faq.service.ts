import { Prisma } from '@prisma/client';
import DataSource from '@database/data-source';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.faq;
  }

  public async findAll(limit: number, page: number) {
    return await DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
        orderBy: { createdAt: 'desc' },
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

  public async update(id: number, data: Prisma.FaqUpdateInput) {
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

export default new Service();
