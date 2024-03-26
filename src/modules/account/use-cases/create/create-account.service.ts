import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { inject, injectable } from 'inversify';
import { AccountEntity } from 'modules/account/entities/account.entity';
import { IAccountRepository, ICreateAccountDto } from 'modules/account/repositories/account-repository.interface';
import { IHashingService } from 'shared/helpers/hashing/hashing-service.interface';
import { TOKENS } from 'shared/ioc/token';
import { CreateAccountInputDto, CreateAccountOutputDto } from './dtos/create-account.dto';

@injectable()
export class CreateAccountService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
    @inject(TOKENS.IHashingService) private hashingService: IHashingService,
  ) {}

  public async execute(data: CreateAccountInputDto): Promise<CreateAccountOutputDto> {
    const emailIsAlreadyInUse = await this.repository.findByEmail(data.email);
    if (emailIsAlreadyInUse) {
      throw new AppException(409, Errors.DUPLICATE_EMAIL);
    }

    const instance = new AccountEntity(data);
    instance.hashPassword(this.hashingService.hash(data.password));
    instance.setStatus(data.role);

    const body = this.fromInputToRepositoryDto(instance);
    const account = await this.repository.save(body);

    return { id: account.id };
  }

  private fromInputToRepositoryDto(instance: AccountEntity): ICreateAccountDto {
    return {
      role: instance.role,
      name: instance.name,
      email: instance.email,
      password: instance.password,
      status: instance.status,
    };
  }
}
