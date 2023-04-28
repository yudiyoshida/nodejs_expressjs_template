import { z } from 'zod';
import { Status } from '@prisma/client';

export type CreateAdminInputDto = z.input<typeof CreateAdminDto>
export type CreateAdminOutputDto = z.output<typeof CreateAdminDto>
export const CreateAdminDto = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  imageUrl: z.string().trim().url(),
  permissions: z.array(
    z.number().positive().int(),
  )
  .min(1)
  .transform((ids) => {
    return ids.map((id) => {
      return { id };
    });
  }),
})
.transform((body) => {
  return {
    ...body,
    password: '',
    status: Status.ativo,
  };
});
