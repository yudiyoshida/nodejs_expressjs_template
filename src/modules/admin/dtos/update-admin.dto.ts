import { z } from 'zod';
import { CreateAdminInput } from './create-admin.dto';

export type UpdateAdminOutputDto = z.output<typeof UpdateAdmin>
export const UpdateAdmin = CreateAdminInput.partial();
