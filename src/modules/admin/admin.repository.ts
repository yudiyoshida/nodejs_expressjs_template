import DataSource from '@database/data-source';

import { Prisma, AccountStatus } from '@prisma/client';
import { AdminDto, AdminWithPermissionsDto } from './dtos/admin.dto';

class Repository {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async findAll(limit: number, page: number, status?: AccountStatus) {
    const where: Prisma.AdminWhereInput = {
      status,
    };

    return DataSource.$transaction([
      this.repository.findMany({
        where,
        take: limit,
        skip: ((page - 1) * limit),
        select: AdminDto,
      }),
      this.repository.count({ where }),
    ]);
  }

  public async findById(id: number) {
    return this.repository.findUnique({
      where: { id },
      select: AdminWithPermissionsDto,
    });
  }

  public async findByUniqueFields(email: string, id?: number) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email },
        ],
        NOT: [
          { id },
        ],
      },
    });
  }

  public async createOne(
    data: Prisma.AdminCreateInput,
    permissions: Prisma.PermissionWhereUniqueInput[],
  ) {
    return this.repository.create({
      data: {
        ...data,
        permissions: {
          connect: permissions,
        },
      },
      select: AdminWithPermissionsDto,
    });
  }

  public async updateOne(
    id: number,
    data: Prisma.AdminUpdateInput,
    permissions?: Prisma.PermissionWhereUniqueInput[],
  ) {
    return DataSource.$transaction(async(tx) => {
      if (permissions) {
        // removes relation between admin and permissions.
        await tx.admin.update({
          where: { id },
          data: {
            permissions: { set: [] },
          },
        });
      }

      // updates admin user, including permissions.
      return await tx.admin.update({
        where: { id },
        data: {
          ...data,
          permissions: {
            connect: permissions,
          },
        },
        select: AdminWithPermissionsDto,
      });
    });
  }

  public async updateStatus(id: number, status: AccountStatus) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: AdminDto,
    });
  }

  public async deleteOne(id: number) {
    return this.repository.delete({
      where: { id },
      select: AdminDto,
    });
  }
}

export default new Repository();
