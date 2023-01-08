import DataSource from '@database/data-source';
import { Prisma, TextType } from '@prisma/client';

class Service {
  private readonly repository;

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

export default new Service();
