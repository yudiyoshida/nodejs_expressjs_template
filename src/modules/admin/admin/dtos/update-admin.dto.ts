import { z } from 'zod';

export type UpdateAdminInputDto = z.input<typeof UpdateAdminDto>
export type UpdateAdminOutputDto = z.output<typeof UpdateAdminDto>
export const UpdateAdminDto = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  imageUrl: z.string().trim().url().optional(),
  permissions: z.array(
    z.number().positive().int(),
  )
  .min(1)
  .transform((ids) => {
    return ids.map((id) => {
      return { id };
    });
  }),
}).partial();
