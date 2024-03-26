import { Account } from '../entities/account.entity';
import { AccountRole } from '../types/account-role.type';
import { AccountStatus } from '../types/account-status.type';

export interface IAccountRepository {
  findAll(): Promise<Account[]>;
  findAllPaginated(page: number, size: number): Promise<[Account[], number]>;
  findById(id: string): Promise<Account|null>;
  findByEmail(email: string): Promise<Account|null>;
  save(data: ICreateAccountDto): Promise<Account>;
}

export interface ICreateAccountDto {
  role: AccountRole;
  name: string;
  email: string;
  password: string;
  status: AccountStatus;
}
