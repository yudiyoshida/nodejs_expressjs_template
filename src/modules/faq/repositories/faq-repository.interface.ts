import { Faq } from '../entities/faq.entity';

export interface IFaqRepository {
  findById(id: string): Promise<Faq|null>;
  create(data: ICreateFaqDto): Promise<Faq>;
}

export interface ICreateFaqDto {
  question: string;
  answer: string;
}
