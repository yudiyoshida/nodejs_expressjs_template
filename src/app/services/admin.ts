import { Prisma } from '@prisma/client';
import { PrismaModel } from '@customTypes/prisma-model';
import DataSource from '@database/data-source';

class AdminService {
  private readonly repository: Prisma.PermissionDelegate<PrismaModel>;

  constructor() {
    this.repository = DataSource.permission;
  }

  public async findAll() {
    return await this.repository.findMany({
      orderBy: { id: 'asc' },
    });
  }

  public async findById(id: number) {
    return await this.repository.findUnique({
      where: { id },
    });
  }
}

export default new AdminService();
