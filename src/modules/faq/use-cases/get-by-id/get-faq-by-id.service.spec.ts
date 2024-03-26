import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { Faq } from 'modules/faq/entities/faq.entity';
import { FaqInMemoryAdapterRepository } from 'modules/faq/repositories/adapters/faq-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { GetFaqByIdService } from './get-faq-by-id.service';

describe('GetFaqByIdService', () => {
  let sut: GetFaqByIdService;
  let mockRepository: jest.Mocked<FaqInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(GetFaqByIdService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IFaqRepository);
  });

  it('should return a faq', async() => {
    const faq = createMock<Faq>({ id: 'faq-id' });
    mockRepository.findById.mockResolvedValue(faq);

    const result = await sut.execute('random-id');

    expect(result).toEqual(faq);
  });

  it('should throw an error when cannot find any faq', async() => {
    mockRepository.findById.mockResolvedValue(null);

    // a fulfilled promise will not fail the test. So, this line prevents it.
    expect.assertions(3);
    return sut.execute('random-id').catch(err => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(404);
      expect(err.error).toBe('FAQ não encontrada na base de dados.');
    });
  });

  it('should call the repository with correct arguments', async() => {
    const faq = createMock<Faq>({ id: 'faq-id' });
    mockRepository.findById.mockResolvedValue(faq);

    await sut.execute('argument-id');

    expect(mockRepository.findById).toHaveBeenCalledExactlyOnceWith('argument-id');
  });
});
