import { z } from 'zod';
import { CreateAdmin } from './create-admin.dto';

export type UpdateAdminInputDto = z.input<typeof UpdateAdmin>
export type UpdateAdminOutputDto = z.output<typeof UpdateAdmin>
export const UpdateAdmin = CreateAdmin.partial();
