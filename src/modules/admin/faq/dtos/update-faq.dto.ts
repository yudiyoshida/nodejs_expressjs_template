import { z } from 'zod';
import { CreateFaqDto } from './create-faq.dto';

export type UpdateFaqInputDto = z.input<typeof UpdateFaqDto>
export type UpdateFaqOutputDto = z.output<typeof UpdateFaqDto>
export const UpdateFaqDto = CreateFaqDto.partial();
