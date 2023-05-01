import { AccountType } from '@prisma/client';
import { z } from 'zod';

export type LoginInputDto = z.input<typeof Login>
export type LoginOutputDto = z.output<typeof Login>
export const Login = z.object({
  username: z.string().trim().min(1),
  password: z.string(),
  type: z.nativeEnum(AccountType),
});
