import 'reflect-metadata';

import { TestBed } from '@automock/jest';
import { Faq } from 'src/modules/faqs/entities/faq.entity';
import { FaqsInMemoryAdapterRepository } from 'src/modules/faqs/repositories/adapters/faqs-in-memory.repository';
import { TOKENS } from 'src/shared/ioc/token';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqDto } from './dtos/create-faq.dto';

const faq: Faq = {
  id: 'faq-id',
  question: 'question foo',
  answer: 'answer bar',
};

describe('CreateFaqService', () => {
  let service: CreateFaqService;
  let mockRepository: jest.Mocked<FaqsInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateFaqService).compile();

    service = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);

    mockRepository.create.mockResolvedValue(faq);
  });

  it('should create a new faq', async() => {
    const result = await service.execute({} as CreateFaqDto);

    expect(result).toBe(faq);
  });

  it('should call the repository only once', async() => {
    await service.execute({} as CreateFaqDto);

    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should call the repository with correct arguments', async() => {
    const argument: CreateFaqDto = { question: 'foo', answer: 'bar' };

    await service.execute(argument);

    expect(mockRepository.create).toHaveBeenCalledWith(argument);
  });
});
