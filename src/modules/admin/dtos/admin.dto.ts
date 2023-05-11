import { Prisma } from '@prisma/client';

// output
export const AdminDto = Prisma.validator<Prisma.AdminSelect>()({
  id: true,
  type: false,
  name: true,
  email: true,
  password: false,
  status: true,
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
