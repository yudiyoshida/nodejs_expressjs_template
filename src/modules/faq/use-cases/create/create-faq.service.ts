import { inject, injectable } from 'inversify';
import { FaqEntity } from 'modules/faq/entities/faq.entity';
import { SuccessMessage } from 'shared/interfaces/success-message.interface';
import { TOKENS } from 'shared/ioc/token';
import { transformDto } from 'shared/validators/transform-dto';
import { ICreateFaqDto, IFaqRepository } from '../../repositories/faq-repository.interface';
import { CreateFaqInputDto } from './dtos/input/create-faq.dto';

@injectable()
export class CreateFaqService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(data: CreateFaqInputDto): Promise<SuccessMessage> {
    const instance = transformDto(FaqEntity, data);
    const body = this.repositoryAdapter(instance);

    await this.faqRepository.create(body);

    return { message: 'Faq created successfully' };
  }

  private repositoryAdapter(input: FaqEntity): ICreateFaqDto {
    return {
      answer: input.answer,
      question: input.question,
    };
  }
}
