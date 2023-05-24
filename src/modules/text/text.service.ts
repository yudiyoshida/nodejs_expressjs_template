import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { Prisma, TextType } from '@prisma/client';
import { TextDto } from './dtos/text.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.text;
  }

  public async findByType(type: TextType) {
    const text = await this.repository.findUnique({
      where: { type },
      select: TextDto,
    });

    if (!text) throw new AppException(404, ErrorMessages.TEXT_NOT_FOUND);
    else return text;
  }

  public async update(id: number, data: Prisma.TextUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: TextDto,
    });
  }
}

export default new Service();
