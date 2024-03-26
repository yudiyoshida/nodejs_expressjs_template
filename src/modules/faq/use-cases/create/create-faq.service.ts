import { inject, injectable } from 'inversify';
import { FaqEntity } from 'modules/faq/entities/faq.entity';
import { TOKENS } from 'shared/ioc/token';
import { ICreateFaqDto, IFaqRepository } from '../../repositories/faq-repository.interface';
import { CreateFaqInputDto, CreateFaqOutputDto } from './dtos/create-faq.dto';

@injectable()
export class CreateFaqService {
  constructor(
    @inject(TOKENS.IFaqRepository) private faqRepository: IFaqRepository,
  ) {}

  public async execute(data: CreateFaqInputDto): Promise<CreateFaqOutputDto> {
    const instance = new FaqEntity(data);
    const body = this.fromInputToRepositoryDto(instance);

    const faq = await this.faqRepository.create(body);

    return { id: faq.id };
  }

  private fromInputToRepositoryDto(input: FaqEntity): ICreateFaqDto {
    return {
      answer: input.answer,
      question: input.question,
    };
  }
}
