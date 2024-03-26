import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { TOKENS } from 'shared/ioc/token';
import { IAccountRepository } from '../../repositories/account-repository.interface';

@injectable()
export class FindAccountByEmailService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
  ) {}

  public async execute(email: string): Promise<Account|null> {
    return this.repository.findByEmail(email);
  }
}
