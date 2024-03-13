import { IAccount } from '../entities/account.entity';
import { CreateAccountOutputDto } from '../use-cases/create/dtos/create-account-output.dto';

export interface IAccountRepository {
  findAllPaginated(page: number, size: number): Promise<[IAccount[], number]>;
  findAll(): Promise<IAccount[]>;
  findByEmail(email: string): Promise<IAccount|null>;
  save(data: CreateAccountOutputDto): Promise<IAccount>;
}
