import { ProfileRole } from '@prisma/client';

export interface IAuthDto {
  id: number;
  role: ProfileRole;
}
