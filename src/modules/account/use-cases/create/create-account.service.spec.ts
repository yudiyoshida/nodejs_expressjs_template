import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { IAccount } from 'modules/account/entities/account.entity';
import { AccountInMemoryAdapterRepository } from 'modules/account/repositories/adapters/account-in-memory.repository';
import { BcryptAdapterService } from 'shared/helpers/hashing/adapters/hashing.service';
import { TOKENS } from 'shared/ioc/token';
import { CreateAccountService } from './create-account.service';
import { CreateAccountInputDto } from './dtos/create-account-input.dto';

describe('CreateAccountService', () => {
  let service: CreateAccountService;
  let mockHashingService: jest.Mocked<BcryptAdapterService>;
  let mockRepository: jest.Mocked<AccountInMemoryAdapterRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(CreateAccountService).compile();

    service = unit;
    mockHashingService = unitRef.get(TOKENS.IHashingService);
    mockRepository = unitRef.get(TOKENS.IAccountRepository);
  });

  it('should throw an error when the provided emails ia already in use', async() => {
    const account = createMock<IAccount>();
    const CreateAccountInputDto = createMock<CreateAccountInputDto>({ email: 'jhondoe@email.com' });
    mockRepository.findByEmail.mockResolvedValue(account);

    expect.assertions(6);
    return service.execute(CreateAccountInputDto).catch((err: any) => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(409);
      expect(err.error).toBe(Errors.DUPLICATE_EMAIL);

      expect(mockRepository.findByEmail).toHaveBeenCalledWith(CreateAccountInputDto.email);
      expect(mockHashingService.hash).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });

  it('should hash the password before creating account', async() => {
    const CreateAccountInputDto = createMock<CreateAccountInputDto>({ password: '123' });
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHashingService.hash.mockReturnValue('hashPassword');

    await service.execute(CreateAccountInputDto);

    expect(mockRepository.findByEmail).toHaveBeenCalledOnce();
    expect(mockHashingService.hash).toHaveBeenCalledWith(CreateAccountInputDto.password);
    expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({ password: 'hashPassword' }));
  });

  it('should create a new account and omit pasword field', async() => {
    const CreateAccountInputDto = createMock<CreateAccountInputDto>();
    const account = createMock<IAccount>({ id: 'acc-id', password: '123dbc' });
    mockRepository.findByEmail.mockResolvedValue(null);
    mockHashingService.hash.mockReturnValue('hashPassword');
    mockRepository.save.mockResolvedValue(account);

    const result = await service.execute(CreateAccountInputDto);

    expect(result).toHaveProperty('message', 'Conta criada com sucesso!');
  });
});
