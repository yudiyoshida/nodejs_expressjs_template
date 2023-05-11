import DataSource from '@database/data-source';

import { IAccountDto } from 'modules/auth/dtos/account.dto';
import { IAccountService } from '@interfaces/account';

class Service implements IAccountService {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findByUsername(username: string): Promise<IAccountDto | null> {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: username },
        ],
      },
    });
  }
}

export default new Service();
