import { Faq } from '../entities/faq.entity';

export interface IFaqRepository {
  findById(id: string): Promise<Faq | null>;
}
