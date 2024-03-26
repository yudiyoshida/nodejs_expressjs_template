import { AccountRole } from 'modules/account/types/account-role.type';
import { AccountStatus } from 'modules/account/types/account-status.type';

export class FindAllAccountsOutputDto {
  id!: string;
  role!: AccountRole;
  name!: string;
  email!: string;
  status!: AccountStatus;
}
