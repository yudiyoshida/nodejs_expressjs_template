import 'reflect-metadata';

import AppException from 'errors/app-exception';

import { TestBed } from '@automock/jest';
import { Faq } from 'modules/faqs/entities/faq.entity';
import { FaqsInMemoryAdapterRepository } from 'modules/faqs/repositories/adapters/faqs-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { GetFaqByIdService } from './get-faq-by-id.service';

const faq: Faq = {
  id: 'faq-id',
  question: 'question foo',
  answer: 'answer bar',
};

describe('GetFaqByIdService', () => {
  let service: GetFaqByIdService;
  let mockRepository: jest.Mocked<FaqsInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(GetFaqByIdService).compile();

    service = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);

    mockRepository.findById.mockResolvedValueOnce(faq).mockResolvedValue(null);
  });

  it('should return a faq', async() => {
    const result = await service.execute('random-id');

    expect(result).toEqual(faq);
  });

  it('should throw an error when cannot find a faq', async() => {
    // calling here to ignore first returned value from mock.
    await service.execute('random-id');

    // a fulfilled promise will not fail the test. So, this line prevents it.
    expect.assertions(3);

    return service.execute('random-id').catch(err => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(404);
      expect(err.error).toBe('FAQ não encontrada na base de dados.');
    });
  });

  it('should call the repository only once', async() => {
    await service.execute('random-id');

    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should call the repository with correct arguments', async() => {
    await service.execute('argument-id');

    expect(mockRepository.findById).toHaveBeenCalledWith('argument-id');
  });
});
