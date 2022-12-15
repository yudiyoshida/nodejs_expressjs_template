import { Prisma } from '@prisma/client';

const UserOmitFields = Prisma.validator<Prisma.UserSelect>()({
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

const UserWithAddresses = Prisma.validator<Prisma.UserSelect>()({
  ...UserOmitFields,
  addresses: true,
});

export {
  UserOmitFields,
  UserWithAddresses,
};
