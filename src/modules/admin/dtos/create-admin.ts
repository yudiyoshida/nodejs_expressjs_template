import { Status, UserType } from '@prisma/client';
import { z } from 'zod';

// input
export const CreateAdminAccountDto = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  imageKey: z.string().trim().optional(),
  imageUrl: z.string().trim().optional(),
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
    isAdmin: true,
    password: '',
    status: Status.ativo,
    type: UserType.admin,
  };
});

export type CreateAdminAccountInputDto = z.input<typeof CreateAdminAccountDto>
export type CreateAdminAccountOutputDto = z.output<typeof CreateAdminAccountDto>
