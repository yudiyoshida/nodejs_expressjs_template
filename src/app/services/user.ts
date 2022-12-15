import { Prisma, UserType, Status } from '@prisma/client';
import { PrismaModel } from '@customTypes/prisma-model';
import DataSource from '@database/data-source';

import { ConnectPermission } from '@interfaces/permission';
import UserSelect from '@customTypes/user';

class UserService {
  private readonly repository: Prisma.UserDelegate<PrismaModel>;
  private readonly securityRepository: Prisma.SecurityDelegate<PrismaModel>;

  constructor() {
    this.repository = DataSource.user;
    this.securityRepository = DataSource.security;
  }

  public async findAllAdmins(limit: number, page: number, status: Status) {
    return await DataSource.$transaction([
      this.repository.findMany({
        where: { status, is_admin: true },
        take: limit,
        skip: ((page - 1) * limit),
        select: UserSelect,
      }),
      this.repository.count({
        where: { status, is_admin: true },
      }),
    ]);
  }

  public async findAllUsers(limit: number, page: number, type: UserType, status: Status) {
    return await DataSource.$transaction([
      this.repository.findMany({
        where: { type, status, is_admin: false },
        take: limit,
        skip: ((page - 1) * limit),
        select: UserSelect,
      }),
      this.repository.count({
        where: { type, status, is_admin: false },
      }),
    ]);
  }

  public async findById(id: number) {
    return await this.repository.findUnique({
      where: { id },
    });
  }

  public async findAdminById(id: number) {
    return await this.repository.findFirst({
      where: { id, is_admin: true },
      select: UserSelect,
    });
  }

  public async findUserById(id: number) {
    return await this.repository.findFirst({
      where: { id, is_admin: false },
      select: UserSelect,
    });
  }

  public async findByEmail(email: string) {
    return await this.repository.findUnique({
      where: { email },
    });
  }

  public async findByEmailAndCode(email: string, code: string) {
    return await this.repository.findFirst({
      where: { email, code },
    });
  }

  public async findByUserName(username: string) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { email: username },
          { phone: username },
        ],
      },
      include: { permissions: true },
    });
  }

  public async findByUniqueFields(data: Prisma.UserWhereInput) {
    return await this.repository.findFirst({
      where: {
        OR: [
          { email: data.email },
          { cpf: data.cpf },
          { phone: data.phone },
        ],
      },
    });
  }

  public async createAdmin(data: Prisma.UserCreateInput, permissions: ConnectPermission[]) {
    return this.repository.create({
      data: {
        ...data,
        permissions: {
          connect: permissions,
        },
      },
      select: UserSelect,
    });
  }

  public async createUser(data: Prisma.UserCreateInput, address: Prisma.AddressCreateInput) {
    return DataSource.$transaction([
      this.repository.create({
        data: {
          ...data,
          addresses: {
            create: address,
          },
        },
        select: UserSelect,
      }),
      this.securityRepository.delete({
        where: { email: data.email },
      }),
    ]);
  }

  public async storeCode(id: number, code: string, code_expires_in: Date) {
    return await this.repository.update({
      where: { id },
      data: {
        code,
        code_expires_in,
      },
    });
  }

  public async changePassword(id: number, password: string) {
    return await this.repository.update({
      where: { id },
      data: {
        password,
        code: null,
        code_expires_in: null,
      },
    });
  }

  public async updateStatus(id: number, status: Status) {
    return await this.repository.update({
      where: { id },
      data: { status },
      select: UserSelect,
    });
  }
}

export default new UserService();
