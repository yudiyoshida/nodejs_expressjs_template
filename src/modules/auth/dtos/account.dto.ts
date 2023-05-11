import { AccountType, AccountStatus } from '@prisma/client';

export interface IAccountDto {
  id: number;
  type: AccountType;
  name: string;
  imageUrl: string | null;
  email: string;
  password: string;
  status: AccountStatus;
}
