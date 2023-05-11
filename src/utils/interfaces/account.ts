import { IAccountDto } from 'modules/auth/dtos/account.dto';

export interface IAccountService {
  findByUsername(username: string): Promise<IAccountDto>
  findByUniqueFields(data: any): Promise<IAccountDto | null>
}
