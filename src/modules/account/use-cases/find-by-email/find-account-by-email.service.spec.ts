import { TestBed } from '@automock/jest';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindAccountByEmailService } from './find-account-by-email.service';

describe('FindAccountByEmailService', () => {
  let sut: FindAccountByEmailService;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FindAccountByEmailService).compile();

    sut = unit;
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
  });

  it('should call the repository with correct arguments', async() => {
    await sut.execute('jhondoe@email.com');

    expect(mockRepository.findByEmail).toHaveBeenCalledWith('jhondoe@email.com');
  });
});
