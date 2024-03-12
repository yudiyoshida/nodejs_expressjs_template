import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { inject, injectable } from 'inversify';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { IAuthenticationService } from 'shared/helpers/authentication/authentication-service.interface';
import { IHashingService } from 'shared/helpers/hashing/hashing-service.interface';
import { TOKENS } from 'shared/ioc/token';
import { LoginDto } from './dtos/login.dto';

@injectable()
export class LoginService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
    @inject(TOKENS.IHashingService) private hashingService: IHashingService,
    @inject(TOKENS.IAuthenticationService) private jwtService: IAuthenticationService,
  ) {}

  public async execute(data: LoginDto) {
    const account = await this.repository.findByEmail(data.credential);
    if (!account) {
      throw new AppException(409, Errors.INVALID_CREDENTIALS);
    }

    const isPasswordCorrect = this.hashingService.compare(data.password, account.password);
    if (!isPasswordCorrect) {
      throw new AppException(409, Errors.INVALID_CREDENTIALS);
    }

    const payload = { sub: account.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
