import { z } from 'zod';

export type LoginOutputDto = z.output<typeof Login>
export const Login = z.object({
  credential: z.string().trim().min(1),
  password: z.string(),
});
