import { z } from 'zod';

export type CreateFaqInputDto = z.input<typeof CreateFaqDto>
export type CreateFaqOutputDto = z.output<typeof CreateFaqDto>
export const CreateFaqDto = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});
