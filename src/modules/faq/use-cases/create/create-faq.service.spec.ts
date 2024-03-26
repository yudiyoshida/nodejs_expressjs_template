import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { ICreateFaqDto } from 'modules/faq/repositories/faq-repository.interface';
import { TOKENS } from 'shared/ioc/token';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqInputDto } from './dtos/create-faq.dto';

describe('CreateFaqService', () => {
  let sut: CreateFaqService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateFaqService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);

    const faq = createMock<Faq>();
    mockRepository.create.mockResolvedValueOnce(faq);
  });

  it('should return the id of the created faq', async() => {
    const result = await sut.execute(createMock<CreateFaqInputDto>());

    expect(result).toHaveProperty('id');
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

    await sut.execute(createFaqDto);

    expect(mockRepository.create).toHaveBeenCalledExactlyOnceWith(iCreateFaqDto);
  });
});
