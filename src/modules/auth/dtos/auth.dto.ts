import { AccountType } from '@prisma/client';

export interface IAuthDto {
  id: number;
  type: AccountType;
}
