import DataSource from '@database/data-source';

import { TextType } from '@prisma/client';
import { TextDto } from './dtos/text.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

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
}

export default new Service();
