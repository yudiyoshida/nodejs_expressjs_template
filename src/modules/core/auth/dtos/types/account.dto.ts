import { Prisma } from '@prisma/client';

const AccountOmitFields = Prisma.validator<Prisma.UserSelect>()({
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

const AccountAllFields = Prisma.validator<Prisma.UserSelect>()({
  ...AccountOmitFields,
  password: true,
  code: true,
  codeExpiresIn: true,
});

const AccountWithPermissions = Prisma.validator<Prisma.UserSelect>()({
  ...AccountOmitFields,
  permissions: true,
});

export {
  AccountOmitFields,
  AccountAllFields,
  AccountWithPermissions,
};
