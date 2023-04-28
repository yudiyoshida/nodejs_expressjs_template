import { Prisma } from '@prisma/client';

// output
export const AccountDto = Prisma.validator<Prisma.AdminSelect>()({
  id: true,
  type: true,
  name: true,
  imageUrl: true,
});
