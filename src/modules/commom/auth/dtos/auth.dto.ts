import { Permission } from '@prisma/client';

export interface IAuthDto {
  id: number;
  type: string;
  permissions: Permission[];
}
