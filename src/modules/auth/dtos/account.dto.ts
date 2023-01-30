import { Prisma } from '@prisma/client';

const AccountOmitFieldsDTO = Prisma.validator<Prisma.UserSelect>()({
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

const AccountAllFieldsDTO = Prisma.validator<Prisma.UserSelect>()({
  ...AccountOmitFieldsDTO,
  password: true,
  code: true,
  codeExpiresIn: true,
});

const AccountWithPermissionsDTO = Prisma.validator<Prisma.UserSelect>()({
  ...AccountOmitFieldsDTO,
  permissions: true,
});

export {
  AccountOmitFieldsDTO,
  AccountAllFieldsDTO,
  AccountWithPermissionsDTO,
};
