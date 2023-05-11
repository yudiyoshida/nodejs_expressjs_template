import DataSource from '@database/data-source';

import { Prisma, TextType } from '@prisma/client';
import { TextDtoAsAdmin } from './dtos/text.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.text;
  }

  public async findByType<T extends Prisma.TextSelect>(type: TextType, dto: T) {
    const text = await this.repository.findUnique({
      where: { type },
      select: dto,
    });

    if (!text) throw new AppException(404, ErrorMessages.TEXT_NOT_FOUND);
    else return text;
  }

  public async update(id: number, data: Prisma.TextUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: TextDtoAsAdmin,
    });
  }
}

export default new Service();
