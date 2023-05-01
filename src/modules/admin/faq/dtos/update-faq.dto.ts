import { z } from 'zod';
import { CreateFaq } from './create-faq.dto';

export type UpdateFaqInputDto = z.input<typeof UpdateFaq>
export type UpdateFaqOutputDto = z.output<typeof UpdateFaq>
export const UpdateFaq = CreateFaq.partial();
