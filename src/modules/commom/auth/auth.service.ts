import DataSource from '@database/data-source';
import { AccountDto } from './dtos/account.dto';
import { AccountType } from '@prisma/client';

class Service {
  private readonly adminRepository;

  constructor() {
    this.adminRepository = DataSource.admin;
  }

  public async findById(id: number) {
    return this.adminRepository.findUnique({
      where: { id },
      select: AccountDto,
    });
  }

  public async findByUsername(username: string, role: AccountType) {
    if (role === 'admin') {
      return this.adminRepository.findFirst({
        where: {
          OR: [
            { email: username },
          ],
        },
        include: { permissions: true },
      });

    } else if (role === 'app') {
      return null;

    }
  }
}

export default new Service();
