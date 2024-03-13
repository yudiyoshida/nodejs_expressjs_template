import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { inject, injectable } from 'inversify';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { IHashingService } from 'shared/helpers/hashing/hashing-service.interface';
import { TOKENS } from 'shared/ioc/token';
import { CreateAccountInputDto } from './dtos/create-account-input.dto';
import { CreateAccountOutputDto } from './dtos/create-account-output.dto';

@injectable()
export class CreateAccountService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
    @inject(TOKENS.IHashingService) private hashingService: IHashingService,
  ) {}

  public async execute(data: CreateAccountInputDto) {
    const emailIsAlreadyInUse = await this.repository.findByEmail(data.email);
    if (emailIsAlreadyInUse) {
      throw new AppException(409, Errors.DUPLICATE_EMAIL);
    }

    const plain: CreateAccountOutputDto = {
      role: data.role,
      name: data.name,
      email: data.email,
      password: this.hashingService.hash(data.password),
      status: (data.role === 'seller') ? 'pending' : 'active',
    };
    await this.repository.save(plain);

    return { message: 'Conta criada com sucesso!' };
  }
}
