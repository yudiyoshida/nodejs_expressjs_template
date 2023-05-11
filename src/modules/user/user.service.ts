import DataSource from '@database/data-source';

import { IAccountDto } from 'modules/auth/dtos/account.dto';
import { IAccountService } from '@interfaces/account';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import { Prisma } from '@prisma/client';

class Service implements IAccountService {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findByUsername(username: string): Promise<IAccountDto> {
    const account = await this.repository.findFirst({
      where: {
        OR: [
          { email: username },
        ],
      },
    });

    if (!account) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return account;
  }

  public async findByUniqueFields(data: Prisma.UserWhereUniqueInput): Promise<IAccountDto | null> {
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
