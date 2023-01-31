import { Prisma } from '@prisma/client';

// input
export interface ICreateAdminDTO {
  name: string;
  birthday: Date;
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
  isAdmin: true,
  type: true,
  name: true,
  birthday: true,
  document: true,
  phone: true,
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

export const AdminWithPermissionsDTO = Prisma.validator<Prisma.UserSelect>()({
  ...AdminDTO,
  permissions: true,
});
