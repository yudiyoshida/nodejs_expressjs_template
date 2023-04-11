import { Prisma } from '@prisma/client';

export const ProfileDto = Prisma.validator<Prisma.ProfileSelect>()({
  id: true,
  role: true,
  email: true,
  phone: false,
  password: false,
  status: false,
  code: false,
  codeExpiresIn: false,
});
