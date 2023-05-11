import DataSource from '@database/data-source';

import { Prisma, AccountStatus } from '@prisma/client';
import { AdminDto, AdminWithPermissionsDto } from './dtos/admin.dto';
import { IAccountService } from '@interfaces/account';
import { IAccountDto } from 'modules/auth/dtos/account.dto';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service implements IAccountService {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async findAllPermissions(id: number) {
    return this.repository.findUnique({
      where: { id },
    }).permissions();
  }

  public async findAll(limit: number, page: number, status: AccountStatus) {
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

  public async findById(id: number) {
    const admin = await this.repository.findUnique({
      where: { id },
      select: AdminWithPermissionsDto,
    });

    if (!admin) throw new AppException(404, ErrorMessages.ADMIN_NOT_FOUND);
    else return admin;
  }

  public async findByUsername(username: string): Promise<IAccountDto> {
    const account = await this.repository.findFirst({
      where: {
        OR: [
          { email: username },
        ],
      },
    });

    if (!account) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return account;
  }

  public async findByUniqueFields(data: Prisma.AdminWhereUniqueInput) {
    return this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
        ],
      },
    });
  }

  public async findByUniqueFieldsExceptMe(id: number, data: Prisma.AdminWhereUniqueInput) {
    const admin = await this.findByUniqueFields(data);
    if (admin && admin.id !== id) throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);
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
      select: AdminWithPermissionsDto,
    });
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

  public async updateStatus(id: number, status: AccountStatus) {
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
