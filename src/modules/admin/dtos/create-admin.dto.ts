import { z } from 'zod';
import { AccountStatus } from '@prisma/client';

export const CreateAdminInput = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  imageUrl: z.string().trim().url().optional(),
  permissions: z.array(
    z.number().positive().int(),
  )
  .min(1).transform((ids) => {
    return ids.map((id) => {
      return { id };
    });
  }),
});

export const CreateAdmin = CreateAdminInput.transform((body) => {
  return {
    ...body,
    password: '',
    status: AccountStatus.ativo,
  };
});

export type CreateAdminOutputDto = z.output<typeof CreateAdmin>
