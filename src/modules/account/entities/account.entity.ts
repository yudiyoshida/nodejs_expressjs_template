import { AccountStatus } from '../types/account-status.type';

export abstract class IAccount {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  status!: AccountStatus;
}

export class account extends IAccount {}
