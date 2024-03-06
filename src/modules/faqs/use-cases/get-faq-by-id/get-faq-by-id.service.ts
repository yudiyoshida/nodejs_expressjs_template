import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { inject, injectable } from 'inversify';
import { IFaqRepository } from 'modules/faqs/repositories/faqs-repository.interface';
import { TOKENS } from 'shared/ioc/token';

@injectable()
export class GetFaqByIdService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(id: string) {
    const faq = await this.faqRepository.findById(id);

    if (!faq) {
      throw new AppException(404, Errors.FAQ_NOT_FOUND);
    }
    return faq;
  }
}
