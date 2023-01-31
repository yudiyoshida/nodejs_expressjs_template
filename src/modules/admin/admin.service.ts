import DataSource from '@database/data-source';
import { Prisma, Status } from '@prisma/client';

import { IAdminPermissionId } from '@interfaces/admin-permission';
import { AdminDTO, AdminWithPermissionsDTO } from './dtos/admin.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.user;
  }

  public async findAll(limit: number, page: number, status: Status) {
    return await DataSource.$transaction([
      this.repository.findMany({
        where: { status, isAdmin: true },
        take: limit,
        skip: ((page - 1) * limit),
        select: AdminDTO,
      }),
      this.repository.count({
        where: { status, isAdmin: true },
      }),
    ]);
  }

  public async findById(id: number) {
    return await this.repository.findFirst({
      where: { id, isAdmin: true },
      select: AdminWithPermissionsDTO,
    });
  }

  public async create(data: Prisma.UserCreateInput, permissions: IAdminPermissionId[]) {
    return this.repository.create({
      data: {
        ...data,
        permissions: {
          connect: permissions,
        },
      },
      select: AdminWithPermissionsDTO,
    });
  }

  public async updateStatus(id: number, status: Status) {
    return await this.repository.update({
      where: { id },
      data: { status },
      select: AdminDTO,
    });
  }
}

export default new Service();
