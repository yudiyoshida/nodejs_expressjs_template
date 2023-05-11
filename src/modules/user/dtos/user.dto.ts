import { Prisma } from '@prisma/client';

// output
export const UserDto = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  // status: true,
  // imageUrl: true,
  // createdAt: true,
  // updatedAt: true,
});
