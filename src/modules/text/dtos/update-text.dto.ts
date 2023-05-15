import { z } from 'zod';

export type UpdateTextOutputDto = z.output<typeof UpdateText>
export const UpdateText = z.object({
  content: z.string().trim().min(1),
});
