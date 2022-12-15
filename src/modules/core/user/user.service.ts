import { Prisma, Status, UserType } from '@prisma/client';
import { UserOmitFields, UserWithAddresses } from '../user/dtos/types/user.dto';

import DataSource from '@database/data-source';

class Service {
  private readonly repository;
  private readonly securityRepository;

  constructor() {
    this.repository = DataSource.user;
    this.securityRepository = DataSource.security;
  }

  public async findAllUsers(limit: number, page: number, type: UserType, status: Status) {
    return await DataSource.$transaction([
      this.repository.findMany({
        where: { type, status, isAdmin: false },
        take: limit,
        skip: ((page - 1) * limit),
        select: UserOmitFields,
      }),
      this.repository.count({
        where: { type, status, isAdmin: false },
      }),
    ]);
  }

  public async findById<T extends Prisma.UserSelect>(id: number, dto: T) {
    return await this.repository.findFirst({
      where: { id, isAdmin: false },
      select: dto,
    });
  }

  public async create(data: Prisma.UserCreateInput, address: Prisma.AddressCreateInput) {
    return DataSource.$transaction([
      this.repository.create({
        data: {
          ...data,
          addresses: {
            create: address,
          },
        },
        select: UserWithAddresses,
      }),
      this.securityRepository.delete({
        where: { email: data.email },
      }),
    ]);
  }

  public async updateStatus(id: number, status: Status) {
    return await this.repository.update({
      where: { id },
      data: { status },
    });
  }
}

export default new Service();
