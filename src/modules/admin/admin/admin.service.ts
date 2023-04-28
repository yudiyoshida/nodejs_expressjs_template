import DataSource from '@database/data-source';

import { Prisma, Status } from '@prisma/client';
import { AdminDto, AdminWithPermissionsDto } from './dtos/admin.dto';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

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

  public async findAll(limit: number, page: number, status: Status) {
    return DataSource.$transaction([
      this.repository.findMany({
        where: { status },
        take: limit,
        skip: ((page - 1) * limit),
        select: AdminWithPermissionsDto,
      }),
      this.repository.count({
        where: { status },
      }),
    ]);
  }

  public async findById(id: number) {
    const admin = await this.repository.findFirst({
      where: { id },
      select: AdminWithPermissionsDto,
    });

    if (!admin) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    else return admin;
  }

  public async findByUniqueFields(data: Prisma.AdminWhereUniqueInput) {
    const admin = await this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
        ],
      },
    });

    if (admin) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);
  }

  public async findByUniqueFieldsExceptMe(id: number, data: Prisma.AdminWhereUniqueInput) {
    //TODO: refactor.
    const admin = await this.repository.findFirst({
      where: {
        NOT: [
          { id },
        ],
        OR: [
          { email: data.email },
        ],
      },
    });

    if (admin) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);
  }

  public async update(
    id: number,
    data: Prisma.AdminUpdateInput,
    permissions?: Prisma.PermissionWhereUniqueInput[],
  ) {
    return DataSource.$transaction(async(tx) => {
      if (permissions) {
        // Remove relacionamento entre user admin e permissions.
        await tx.admin.update({
          where: { id },
          data: {
            permissions: { set: [] },
          },
        });
      }

      // Atualiza user admin, inclusive as permissions.
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

  public async updateStatus(id: number, status: Status) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: AdminDto,
    });
  }

  public async delete(id: number) {
    return this.repository.delete({
      where: { id },
    });
  }
}

export default new Service();
