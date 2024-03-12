import { IAccount } from '../entities/account.entity';

export interface IAccountRepository {
  findByEmail(email: string): Promise<IAccount|null>;
  save(data: IAccount): Promise<IAccount>;
}
