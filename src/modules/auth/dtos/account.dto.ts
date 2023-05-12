import { AccountRole, AccountStatus } from '@prisma/client';

export interface IAccountDto {
  id: number;
  role: AccountRole;
  name: string;
  imageUrl: string | null;
  email: string;
  password: string;
  status: AccountStatus;
}
