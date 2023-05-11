import { z } from 'zod';

export type UpdateTextInputDto = z.input<typeof UpdateText>
export type UpdateTextOutputDto = z.output<typeof UpdateText>
export const UpdateText = z.object({
  content: z.string().trim().min(1),
});
