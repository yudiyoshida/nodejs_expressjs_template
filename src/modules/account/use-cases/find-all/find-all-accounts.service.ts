import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { QueriesDto } from 'shared/dtos/queries/queries.dto';
import { TOKENS } from 'shared/ioc/token';
import { IAccountRepository } from '../../repositories/account-repository.interface';
import { FindAllAccountsOutputDto } from './dtos/find-all-accounts.dto';

@injectable()
export class FindAllAccountsService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
  ) {}

  public async execute(queries: QueriesDto) {
    const { page, size } = queries;

    if (page && size) {
      const [accounts, count] = await this.repository.findAllPaginated(page, size);

      return [this.fromRepositoryToOutputDto(accounts), count];
    }

    const accounts = await this.repository.findAll();
    return this.fromRepositoryToOutputDto(accounts);
  }

  private fromRepositoryToOutputDto(data: Account[]): FindAllAccountsOutputDto[] {
    return data.map(item => {
      return {
        id: item.id,
        email: item.email,
        name: item.name,
        role: item.role,
        status: item.status,
      };
    });

  }
}
