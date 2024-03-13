import { inject, injectable } from 'inversify';
import { QueriesDto } from 'shared/dtos/queries/queries.dto';
import { TOKENS } from 'shared/ioc/token';
import { IAccountRepository } from '../../repositories/account-repository.interface';

@injectable()
export class FindAllAccountsService {
  constructor(
    @inject(TOKENS.IAccountRepository) private repository: IAccountRepository,
  ) {}

  public async execute(queries: QueriesDto) {
    const { page, size } = queries;

    if (page && size) {
      const accounts = await this.repository.findAllPaginated(page, size);

      return accounts;
    }
    return this.repository.findAll();
  }
}
