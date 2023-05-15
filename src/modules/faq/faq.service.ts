import DataSource from '@database/data-source';

import { Prisma } from '@prisma/client';
import { FaqDtoAsAdmin } from './dtos/faq.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.faq;
  }

  public async findAll<T extends Prisma.FaqSelect>(limit: number, page: number, dto: T) {
    return DataSource.$transaction([
      this.repository.findMany({
        take: limit,
        skip: ((page - 1) * limit),
        select: dto,
        orderBy: { createdAt: 'desc' },
      }),
      this.repository.count(),
    ]);
  }

  public async findById(id: number) {
    const faq = await this.repository.findUnique({
      where: { id },
      select: FaqDtoAsAdmin,
    });

    if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);
    else return faq;
  }

  public async create(data: Prisma.FaqCreateInput) {
    return this.repository.create({
      data,
      select: FaqDtoAsAdmin,
    });
  }

  public async update(id: number, data: Prisma.FaqUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: FaqDtoAsAdmin,
    });
  }

  public async delete(id: number) {
    return this.repository.delete({
      where: { id },
    });
  }
}

export default new Service();
