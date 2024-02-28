import 'reflect-metadata';

import AppException from '@errors/app-exception';
import { Faq } from '@modules/faqs/entities/faq.entity';
import { IFaqRepository } from '@modules/faqs/repositories/faqs-repository.interface';
import { Container } from 'inversify';
import { TOKENS } from 'shared/ioc/token';
import { beforeEach, describe, expect, it, vitest } from 'vitest';
import { GetFaqByIdService } from './get-faq-by-id.service';

const faq: Faq = {
  id: 'faq-id',
  question: 'question foo',
  answer: 'answer bar',
};

describe('GetFaqByIdService', () => {
  let service: GetFaqByIdService;

  beforeEach(async() => {
    const container = new Container();
    const mockFaqRepository = { findById: vitest.fn().mockResolvedValueOnce(faq).mockResolvedValue(null) };

    container.bind<IFaqRepository>(TOKENS.IFaqRepository).toConstantValue(mockFaqRepository);

    service = container.resolve(GetFaqByIdService);
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
      expect(err.message).toBe('FAQ não encontrada na base de dados.');
    });
  });
});
