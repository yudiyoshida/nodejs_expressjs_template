import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import { AccountDto } from './dtos/account.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: AccountDto,
    });
  }

  public async findByUsername(username: string) {
    const account = await this.repository.findFirst({
      where: {
        OR: [
          { email: username },
        ],
      },
      include: { permissions: true },
    });

    if (!account) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return account;
  }
}

export default new Service();
