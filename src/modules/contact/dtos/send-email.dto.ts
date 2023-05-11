import { z } from 'zod';

export type SendEmailInputDto = z.input<typeof SendEmail>
export type SendEmailOutputDto = z.output<typeof SendEmail>
export const SendEmail = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});
