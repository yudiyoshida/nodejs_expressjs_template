import DataSource from '@database/data-source';

import { Prisma, Status } from '@prisma/client';
import { AdminDto } from './dtos/admin.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async create(
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
      select: AdminDto,
    });
  }

  public async findAll(
    limit: number,
    page: number,
    status: Status,
  ) {
    return DataSource.$transaction([
      this.repository.findMany({
        where: { status },
        take: limit,
        skip: ((page - 1) * limit),
        select: AdminDto,
      }),
      this.repository.count({
        where: { status },
      }),
    ]);
  }

  public async findByUniqueFields(data: Prisma.AdminCreateInput) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
        ],
      },
    });
  }

  // public async findById(id: number) {
  //   return this.repository.findFirst({
  //     where: { id, isAdmin: true },
  //     select: AdminWithPermissionsDTO,
  //   });
  // }

  // public async update(id: number, data: Prisma.UserUpdateInput, permissions: IAdminPermissionIdDTO[]) {
  //   return DataSource.$transaction(async(tx) => {
  //     // Remove relacionamento entre user admin e permissions.
  //     await tx.user.update({
  //       where: { id },
  //       data: {
  //         permissions: {
  //           set: [],
  //         },
  //       },
  //     });

  //     // Atualiza user admin, inclusive as permissions.
  //     return await tx.user.update({
  //       where: { id },
  //       data: {
  //         ...data,
  //         permissions: {
  //           connect: permissions,
  //         },
  //       },
  //       select: AdminWithPermissionsDTO,
  //     });
  //   });
  // }

  // public async delete(id: number) {
  //   return this.repository.delete({
  //     where: { id },
  //   });
  // }

  // public async updateStatus(id: number, status: Status) {
  //   return this.repository.update({
  //     where: { id },
  //     data: { status },
  //     select: AdminDTO,
  //   });
  // }
}

export default new Service();
