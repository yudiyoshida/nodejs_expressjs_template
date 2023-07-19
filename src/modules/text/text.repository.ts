import DataSource from '@database/data-source';

import { Prisma, TextType } from '@prisma/client';
import { TextDto } from './dtos/text.dto';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.text;
  }

  public async findByType(type: TextType) {
    return this.repository.findUnique({
      where: { type },
      select: TextDto,
    });
  }

  public async update(id: number, data: Prisma.TextUpdateInput) {
    return this.repository.update({
      where: { id },
      data,
      select: TextDto,
    });
  }
}

export default new Repository();
