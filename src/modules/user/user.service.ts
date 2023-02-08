import DataSource from '@database/data-source';

import { Prisma, Status, UserType } from '@prisma/client';
import { UserDTO, UserWithAddressDTO } from './dtos/user.dto';

class Service {
  private readonly repository;
  private readonly securityRepository;

  constructor() {
    this.repository = DataSource.user;
    this.securityRepository = DataSource.security;
  }

  public async findAll(limit: number, page: number, type: UserType, status: Status) {
    return DataSource.$transaction([
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
    return this.repository.findFirst({
      where: { id, isAdmin: false },
      select: UserWithAddressDTO,
    });
  }

  public async create(data: Prisma.UserCreateInput, address: Prisma.AddressCreateInput) {
    return DataSource.$transaction([
      this.repository.create({
        data: {
          ...data,
          address: {
            create: address,
          },
        },
        select: UserWithAddressDTO,
      }),
      this.securityRepository.delete({
        where: { email: data.email },
      }),
    ]);
  }

  public async update(id: number, data: Prisma.UserUpdateInput, address: Prisma.AddressUpdateInput) {
    return this.repository.update({
      where: { id },
      data: {
        ...data,
        address: {
          update: address,
        },
      },
      select: UserWithAddressDTO,
    });
  }

  public async delete(id: number) {
    return this.repository.delete({
      where: { id },
    });
  }

  public async updateStatus(id: number, status: Status) {
    return this.repository.update({
      where: { id },
      data: { status },
      select: UserDTO,
    });
  }
}

export default new Service();
