import { Prisma } from '@prisma/client';

const AdminOmitFields = Prisma.validator<Prisma.UserSelect>()({
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

const AdminAllFields = Prisma.validator<Prisma.UserSelect>()({
  ...AdminOmitFields,
  password: true,
  code: true,
  codeExpiresIn: true,
});

const AdminWithPermissions = Prisma.validator<Prisma.UserSelect>()({
  ...AdminOmitFields,
  permissions: true,
});

export {
  AdminOmitFields,
  AdminAllFields,
  AdminWithPermissions,
};
