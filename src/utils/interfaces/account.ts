import { IAccountDto } from 'modules/auth/dtos/account.dto';

export interface IAccountService {
  findByUsername(username: string): Promise<IAccountDto | null>
}
