import { z } from 'zod';
import { Status } from '@prisma/client';

export type CreateAdminInputDto = z.input<typeof CreateAdmin>
export type CreateAdminOutputDto = z.output<typeof CreateAdminOutput>
export const CreateAdmin = z.object({
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
});

export const CreateAdminOutput = CreateAdmin
.transform((body) => {
  return {
    ...body,
    password: '',
    status: Status.ativo,
  };
});
