import 'reflect-metadata';

import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { CreateFaqService } from './create-faq.service';
import { CreateFaqDto } from './dtos/create-faq.dto';

describe('CreateFaqService', () => {
  let service: CreateFaqService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateFaqService).compile();

    service = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
  });

  it('should return the result without adding or removing any field', async() => {
    const faq = createMock<Faq>();
    mockRepository.create.mockResolvedValue(faq);

    const result = await service.execute({} as CreateFaqDto);

    expect(result).toEqual(faq);
  });

  it('should call the repository with correct arguments', async() => {
    const argument: CreateFaqDto = { question: 'foo', answer: 'bar' };

    await service.execute(argument);

    expect(mockRepository.create).toHaveBeenCalledExactlyOnceWith(argument);
  });
});
