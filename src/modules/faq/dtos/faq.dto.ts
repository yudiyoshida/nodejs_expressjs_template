import { Prisma } from '@prisma/client';

// output
export const FaqDtoAsAdmin = Prisma.validator<Prisma.FaqSelect>()({
  id: true,
  question: true,
  answer: true,
  createdAt: true,
  updatedAt: true,
});

export const FaqDtoAsNoAuth = Prisma.validator<Prisma.FaqSelect>()({
  id: true,
  question: true,
  answer: true,
  createdAt: false,
  updatedAt: false,
});
