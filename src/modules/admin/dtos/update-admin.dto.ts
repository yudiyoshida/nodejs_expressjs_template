import { z } from 'zod';

export type UpdateAdminInputDto = z.input<typeof UpdateAdmin>
export type UpdateAdminOutputDto = z.output<typeof UpdateAdmin>
export const UpdateAdmin = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().trim().email().optional(),
  imageUrl: z.string().trim().url().optional().optional(),
  permissions: z.array(
    z.number().positive().int(),
  )
  .min(1)
  .transform((ids) => {
    return ids.map((id) => {
      return { id };
    });
  }).optional(),
});
