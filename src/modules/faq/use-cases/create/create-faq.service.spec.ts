import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { ICreateFaqDto } from 'modules/faq/repositories/faq-repository.interface';
import { TOKENS } from 'shared/ioc/token';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqInputDto } from './dtos/input/create-faq.dto';

describe('CreateFaqService', () => {
  let service: CreateFaqService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateFaqService).compile();

    service = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
  });

  it('should return a success message', async() => {
    const faq = createMock<Faq>();
    mockRepository.create.mockResolvedValue(faq);

    const result = await service.execute({} as CreateFaqInputDto);

    expect(result).toHaveProperty('message', 'Faq created successfully');
  });

  it('should call the repository with correct arguments', async() => {
    const createFaqDto: CreateFaqInputDto = {
      answer: 'foo',
      question: 'bar',
    };

    const iCreateFaqDto: ICreateFaqDto = {
      answer: createFaqDto.answer,
      question: createFaqDto.question,
    };

    await service.execute(createFaqDto);

    expect(mockRepository.create).toHaveBeenCalledExactlyOnceWith(iCreateFaqDto);
  });
});
