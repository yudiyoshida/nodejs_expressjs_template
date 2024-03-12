import { IAccount } from '../entities/account.entity';
import { CreateAccountOutputDto } from '../use-cases/create-account/dtos/create-account-output.dto';

export interface IAccountRepository {
  findByEmail(email: string): Promise<IAccount|null>;
  save(data: CreateAccountOutputDto): Promise<IAccount>;
}
