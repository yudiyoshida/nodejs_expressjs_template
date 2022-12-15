import { Prisma, Status } from '@prisma/client';
import { IConnectAdminPermission } from '../admin-permission/dtos/interfaces/admin-permission.dto';
import { AdminOmitFields, AdminWithPermissions } from './dtos/types/admin.dto';

import DataSource from '@database/data-source';

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
        select: AdminOmitFields,
      }),
      this.repository.count({
        where: { status, isAdmin: true },
      }),
    ]);
  }

  public async findById<T extends Prisma.UserSelect>(id: number, dto: T) {
    return await this.repository.findFirst({
      where: { id, isAdmin: true },
      select: dto,
    });
  }

  public async create(data: Prisma.UserCreateInput, permissions: IConnectAdminPermission[]) {
    return this.repository.create({
      data: {
        ...data,
        permissions: {
          connect: permissions,
        },
      },
      select: AdminWithPermissions,
    });
  }

  public async updateStatus(id: number, status: Status) {
    return await this.repository.update({
      where: { id },
      data: { status },
      select: AdminWithPermissions,
    });
  }
}

export default new Service();
