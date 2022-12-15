import { Prisma, TextType } from '@prisma/client';
import { PrismaModel } from '@customTypes/prisma-model';
import DataSource from '@database/data-source';

class TextService {
  private readonly repository: Prisma.TextDelegate<PrismaModel>;

  constructor() {
    this.repository = DataSource.text;
  }

  public async findByType(type: TextType) {
    return await this.repository.findUnique({
      where: { type },
    });
  }

  public async update(type: TextType, data: Prisma.TextUpdateInput) {
    return await this.repository.update({
      where: { type },
      data,
    });
  }
}

export default new TextService();
