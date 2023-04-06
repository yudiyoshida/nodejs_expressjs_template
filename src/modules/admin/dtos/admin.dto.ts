import { Prisma } from '@prisma/client';

// output
export const AdminDto = Prisma.validator<Prisma.AdminSelect>()({
  id: true,
  isAdmin: false,
  type: true,
  name: true,
  email: true,
  password: false,
  status: true,
  imageKey: true,
  imageUrl: true,
  code: false,
  codeExpiresIn: false,
  createdAt: true,
  updatedAt: true,
});

export const AdminWithPermissionsDto = Prisma.validator<Prisma.AdminSelect>()({
  ...AdminDto,
  permissions: true,
});
