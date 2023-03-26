import { Prisma } from '@prisma/client';

// input
export interface IUpsertAdminDTO {
  name: string;
  document: string;
  phone: string;
  email: string;
  imageKey?: string;
  imageUrl?: string;
  permissions: number[];
}

// output
export const AdminDTO = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  isAdmin: false,
  type: true,
  name: true,
  birthday: false,
  document: true,
  phone: true,
  email: true,
  password: false,
  status: true,
  imageKey: true,
  imageUrl: true,
  code: false,
  codeExpiresIn: false,
  createdAt: false,
  updatedAt: false,
});

export const AdminWithPermissionsDTO = Prisma.validator<Prisma.UserSelect>()({
  ...AdminDTO,
  permissions: true,
});
