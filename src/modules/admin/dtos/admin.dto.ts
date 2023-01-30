import { Prisma } from '@prisma/client';

const AdminOmitSensitiveFieldsDTO = Prisma.validator<Prisma.UserSelect>()({
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

const AdminAllFieldsDTO = Prisma.validator<Prisma.UserSelect>()({
  ...AdminOmitSensitiveFieldsDTO,
  password: true,
  code: true,
  codeExpiresIn: true,
});

const AdminWithPermissionsDTO = Prisma.validator<Prisma.UserSelect>()({
  ...AdminOmitSensitiveFieldsDTO,
  permissions: true,
});

export {
  AdminOmitSensitiveFieldsDTO,
  AdminAllFieldsDTO,
  AdminWithPermissionsDTO,
};
