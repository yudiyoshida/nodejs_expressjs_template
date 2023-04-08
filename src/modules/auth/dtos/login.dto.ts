import { z } from 'zod';

export type LoginInputDto = z.input<typeof LoginDto>
export type LoginOutputDto = z.output<typeof LoginDto>
export const LoginDto = z.object({
  username: z.string().trim().min(1),
  password: z.string(),
});
