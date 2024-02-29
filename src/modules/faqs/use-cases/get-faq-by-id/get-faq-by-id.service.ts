import AppException from 'src/errors/app-exception';
import errorMessages from 'src/errors/error-messages';

import { inject, injectable } from 'inversify';
import { IFaqRepository } from 'src/modules/faqs/repositories/faqs-repository.interface';
import { TOKENS } from 'src/shared/ioc/token';

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
