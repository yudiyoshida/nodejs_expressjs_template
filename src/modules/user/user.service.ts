import DataSource from '@database/data-source';

import { Prisma, Status, UserType } from '@prisma/client';
import { UserDTO, UserWithAddressesDTO } from './dtos/user.dto';

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
        select: UserDTO,
      }),
      this.repository.count({
        where: { type, status, isAdmin: false },
      }),
    ]);
  }

  public async findById(id: number) {
    return await this.repository.findFirst({
      where: { id, isAdmin: false },
      select: UserWithAddressesDTO,
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
        select: UserWithAddressesDTO,
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
      select: UserDTO,
    });
  }
}

export default new Service();
