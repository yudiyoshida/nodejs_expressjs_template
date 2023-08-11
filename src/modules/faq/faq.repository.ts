import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { FaqDto } from './dtos/faq.dto';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.faq;
  }

  public findAll(limit: number, page: number, search?: string) {
    const where: Prisma.FaqWhereInput = {
      AND: [
        { OR:
          [
            {
              question: { contains: search },
            },
            {
              answer: { contains: search },
            },
          ],
        },
      ],
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: limit,
        skip: ((page - 1) * limit),
        select: FaqDto,
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count({ where }),
    ]);
  }

  public findOne(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: FaqDto,
    });
  }

  public createOne(data: Prisma.FaqCreateInput) {
    return this.repository.create({
      data,
      select: FaqDto,
    });
  }

  public updateOne(id: number, data: Prisma.FaqUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: FaqDto,
    });
  }

  public deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: FaqDto,
    });
  }
}

export default new Repository();
