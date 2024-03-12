import 'reflect-metadata';

import { TestBed } from '@automock/jest';
import { createMock } from '@golevelup/ts-jest';
import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { IAccount } from 'modules/account/entities/account.entity';
import { FindAccountByEmailService } from 'modules/account/use-cases/find-account-by-email/find-account-by-email.service';
import { AuthenticationJwtAdapterService } from 'shared/helpers/authentication/adapters/authentication-jwt.service';
import { BcryptAdapterService } from 'shared/helpers/hashing/adapters/hashing.service';
import { TOKENS } from 'shared/ioc/token';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let mockFindAccountByEmailService: jest.Mocked<FindAccountByEmailService>;
  let mockHashingService: jest.Mocked<BcryptAdapterService>;
  let mockAuthenticationService: jest.Mocked<AuthenticationJwtAdapterService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(LoginService).compile();

    service = unit;
    mockFindAccountByEmailService = unitRef.get(FindAccountByEmailService);
    mockHashingService = unitRef.get(TOKENS.IHashingService);
    mockAuthenticationService = unitRef.get(TOKENS.IAuthenticationService);
  });

  it('should throw an error when cannot find account by credential', async() => {
    const loginDto = createMock<LoginDto>({ credential: 'jhondoe@email.com' });
    mockFindAccountByEmailService.execute.mockResolvedValue(null);

    expect.assertions(6);
    return service.execute(loginDto).catch((err: any) => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(409);
      expect(err.error).toBe(Errors.INVALID_CREDENTIALS);

      expect(mockFindAccountByEmailService.execute).toHaveBeenCalledWith(loginDto.credential);
      expect(mockHashingService.compare).not.toHaveBeenCalled();
      expect(mockAuthenticationService.sign).not.toHaveBeenCalled();
    });
  });

  it('should throw an error when providing incorrect password', async() => {
    const loginDto = createMock<LoginDto>({ password: '123456' });
    const account = createMock<IAccount>({ password: 'hashedPassword' });
    mockFindAccountByEmailService.execute.mockResolvedValue(account);
    mockHashingService.compare.mockReturnValue(false);

    expect.assertions(6);
    return service.execute(loginDto).catch((err: any) => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(409);
      expect(err.error).toBe(Errors.INVALID_CREDENTIALS);

      expect(mockFindAccountByEmailService.execute).toHaveBeenCalledOnce();
      expect(mockHashingService.compare).toHaveBeenCalledWith(loginDto.password, account.password);
      expect(mockAuthenticationService.sign).not.toHaveBeenCalled();
    });
  });

  it('should return an access token when providing correct credentials', async() => {
    const loginDto = createMock<LoginDto>();
    const account = createMock<IAccount>({ id: 'acc-id' });
    mockFindAccountByEmailService.execute.mockResolvedValue(account);
    mockHashingService.compare.mockReturnValue(true);
    mockAuthenticationService.sign.mockReturnValue('token de acesso');

    const result = await service.execute(loginDto);


    expect(result).toHaveProperty('accessToken', 'token de acesso');
    expect(mockFindAccountByEmailService.execute).toHaveBeenCalledOnce();
    expect(mockHashingService.compare).toHaveBeenCalledOnce();
    expect(mockAuthenticationService.sign).toHaveBeenCalledOnce();
  });
});
