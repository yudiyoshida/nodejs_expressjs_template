import { z } from 'zod';

export type ForgotPasswordOutputDto = z.output<typeof ForgotPassword>
export const ForgotPassword = z.object({
  credential: z.string().trim().email(),
});

export type ResetPasswordOutputDto = z.output<typeof ResetPassword>
export const ResetPassword = z.object({
  credential: z.string().trim().email(),
  code: z.string().trim().min(1),
  password: z.string().trim().min(8),
  confirmPassword: z.string().trim(),
})
.refine((body) => {
  if (body.password !== body.confirmPassword) return false;
  else return true;
}, {
  message: 'Senhas informadas estão diferentes.',
});
