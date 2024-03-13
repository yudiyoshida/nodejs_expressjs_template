import { TestBed } from '@automock/jest';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { TOKENS } from 'shared/ioc/token';
import { FindAllAccountsService } from './find-all-accounts.service';

describe('FindAllAccountsService', () => {
  let service: FindAllAccountsService;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FindAllAccountsService).compile();

    service = unit;
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
  });

  it('should be defined', async() => {
    expect(service).toBeDefined();
    expect(mockRepository).toBeDefined();
  });
});
