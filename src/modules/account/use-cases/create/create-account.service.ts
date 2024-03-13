import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { IHashingService } from 'shared/helpers/hashing/hashing-service.interface';
import { TOKENS } from 'shared/ioc/token';
import { transformDto } from 'shared/validators/transform-dto';
import { FindAccountByEmailService } from '../find-by-email/find-account-by-email.service';
import { CreateAccountInputDto } from './dtos/create-account-input.dto';

@injectable()
export class CreateAccountService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
    @inject(TOKENS.IHashingService) private hashingService: IHashingService,
    @inject(FindAccountByEmailService) private findAccountByEmailService: FindAccountByEmailService,
  ) {}

  public async execute(data: CreateAccountInputDto) {
    const emailIsAlreadyInUse = await this.findAccountByEmailService.execute(data.email);
    if (emailIsAlreadyInUse) {
      throw new AppException(409, Errors.DUPLICATE_EMAIL);
    }

    const instance = transformDto(Account, data);

    data.password = this.hashingService.hash(data.password);

    return await this.repository.save(instance.getCreateAccountDto());

    return { message: 'Conta criada com sucesso!' };
  }
}
