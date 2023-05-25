import DataSource from '@database/data-source';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import { Prisma, AccountStatus } from '@prisma/client';
import { AdminDto, AdminWithPermissionsDto } from './dtos/admin.dto';

class Service {
  private readonly repository;

  constructor() {
    this.repository = DataSource.admin;
  }

  public async findAllPermissions(id: number) {
    return this.repository.findUnique({
      where: { id },
    }).permissions();
  }

  public async findAll(limit: number, page: number, status?: AccountStatus) {
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

  public async findByCredential(credential: string) {
    const admin = await this.repository.findFirst({
      where: {
        OR: [
          { email: credential },
        ],
      },
    });

    if (!admin) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
    else return admin;
  }

  public async findByCredentialAndCode(credential: string, code: string) {
    const admin = await this.repository.findFirst({
      where: {
        code,
        OR: [
          { email: credential },
        ],
      },
    });

    if (!admin) throw new AppException(400, ErrorMessages.INCORRECT_CODE_PASS);
    else return admin;
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
        // Remove relacionamento entre admin e permissions.
        await tx.admin.update({
          where: { id },
          data: {
            permissions: { set: [] },
          },
        });
      }

      // Atualiza admin, inclusive as permissions.
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

  public async storeCode(id: number, code: string, codeExpiresIn: Date) {
    return this.repository.update({
      where: { id },
      data: {
        code,
        codeExpiresIn,
      },
    });
  }

  public async changePassword(id: number, password: string) {
    return this.repository.update({
      where: { id },
      data: {
        code: null,
        codeExpiresIn: null,
        password,
      },
    });
  }
}

export default new Service();
