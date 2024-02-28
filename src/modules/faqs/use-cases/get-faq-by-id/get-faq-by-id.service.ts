import AppException from '@errors/app-exception';
import errorMessages from '@errors/error-messages';

import { IFaqRepository } from '@modules/faqs/repositories/faqs-repository.interface';
import { inject, injectable } from 'inversify';
import { TOKENS } from 'shared/ioc/token';

@injectable()
export class GetFaqByIdService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(id: string) {
    const faq = await this.faqRepository.findById(id);

    if (!faq) {
      throw new AppException(404, errorMessages.FAQ_NOT_FOUND);
    }
    return faq;
  }
}
