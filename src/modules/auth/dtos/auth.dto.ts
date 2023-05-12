import { AccountRole } from '@prisma/client';

export interface IAuthDto {
  id: number;
  role: AccountRole;
}
