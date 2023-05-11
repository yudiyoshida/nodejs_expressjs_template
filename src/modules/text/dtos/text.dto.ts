import { Prisma } from '@prisma/client';

// output
export const TextDtoAsAdmin = Prisma.validator<Prisma.TextSelect>()({
  id: true,
  type: true,
  content: true,
  createdAt: true,
  updatedAt: true,
});

export const TextDtoAsNoAuth = Prisma.validator<Prisma.TextSelect>()({
  id: true,
  type: true,
  content: true,
  createdAt: false,
  updatedAt: false,
});
