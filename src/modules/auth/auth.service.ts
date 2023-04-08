import DataSource from '@database/data-source';
import { AdminDto } from 'modules/admin/dtos/admin.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: AdminDto,
    });
  }

  public async findByUsername(username: string) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: username },
          // { phone: username },
        ],
      },
      include: { permissions: true },
    });
  }
}

export default new Service();
