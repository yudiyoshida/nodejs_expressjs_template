import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { Prisma } from '@prisma/client';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findByCredential(credential: string) {
    const user = await this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
      },
    });

    if (!user) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return user;
  }

  public async findByUniqueFields(data: Prisma.UserWhereUniqueInput) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
        ],
      },
    });
  }
}

export default new Service();
