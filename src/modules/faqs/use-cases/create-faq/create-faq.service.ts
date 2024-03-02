import { inject, injectable } from 'inversify';
import { TOKENS } from 'shared/ioc/token';
import { IFaqRepository } from '../../repositories/faqs-repository.interface';
import { CreateFaqDto } from './dtos/create-faq.dto';

@injectable()
export class CreateFaqService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(data: CreateFaqDto) {
    return this.faqRepository.create(data);
  }
}
