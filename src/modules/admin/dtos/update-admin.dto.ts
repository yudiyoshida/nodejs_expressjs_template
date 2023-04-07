import { z } from 'zod';
import { CreateAdminDto } from './create-admin.dto';

export type UpdateAdminInputDto = z.input<typeof UpdateAdminDto>
export type UpdateAdminOutputDto = z.output<typeof UpdateAdminDto>
export const UpdateAdminDto = CreateAdminDto; // update deve mandar os mesmos campos do create.
