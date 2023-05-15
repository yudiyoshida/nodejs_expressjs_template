import { z } from 'zod';

export type CreateFaqOutputDto = z.output<typeof CreateFaq>
export const CreateFaq = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});
