import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { FaqDto } from './dtos/faq.dto';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.faq;
  }

  public async findAll(limit: number, page: number) {
    return this.repository.findMany({
      take: limit,
      skip: ((page - 1) * limit),
      select: FaqDto,
      orderBy: { createdAt: 'desc' },
    });
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: FaqDto,
    });
  }

  public async create(data: Prisma.FaqCreateInput) {
    return this.repository.create({
      data,
      select: FaqDto,
    });
  }

  public async update(id: number, data: Prisma.FaqUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: FaqDto,
    });
  }

  public async delete(id: number) {
    return this.repository.delete({
      where: { id },
      select: FaqDto,
    });
  }
}

export default new Repository();
