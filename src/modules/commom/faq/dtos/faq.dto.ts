import { Prisma } from '@prisma/client';

// output
export const FaqDto = Prisma.validator<Prisma.FaqSelect>()({
  id: true,
  question: true,
  answer: true,
  createdAt: false,
  updatedAt: false,
});
