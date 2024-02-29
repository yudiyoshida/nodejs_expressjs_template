import { Faq } from '../entities/faq.entity';
import { CreateFaqDto } from '../use-cases/create-faq/dtos/create-faq.dto';

export interface IFaqRepository {
  findById(id: string): Promise<Faq | null>;
  create(data: CreateFaqDto): Promise<Faq>;
}
