import { inject, injectable } from 'inversify';
import { IFaqRepository } from 'modules/faqs/repositories/faqs-repository.interface';
import { TOKENS } from 'shared/ioc/token';
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
