import { Prisma } from '@prisma/client';

const UserOmitSensitiveFieldsDTO = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  isAdmin: true,
  type: true,
  name: true,
  email: true,
  status: true,
  phone: true,
  document: true,
  birthday: true,
  imageUrl: true,
  imageKey: true,
  createdAt: true,
  updatedAt: true,
});

const UserWithAddressesDTO = Prisma.validator<Prisma.UserSelect>()({
  ...UserOmitSensitiveFieldsDTO,
  addresses: true,
});

export {
  UserOmitSensitiveFieldsDTO,
  UserWithAddressesDTO,
};
