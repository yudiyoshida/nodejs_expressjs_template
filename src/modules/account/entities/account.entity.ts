import { Expose } from 'class-transformer';
import { AccountRole } from '../types/account-role.type';
import { AccountStatus } from '../types/account-status.type';

export abstract class IAccount {
  @Expose() public id!: string;
  @Expose() public role!: AccountRole;
  @Expose() public name!: string;
  @Expose() public email!: string;
  @Expose() public password!: string;
  @Expose() public status!: AccountStatus;
}

export class Account extends IAccount {
  public getStatus(type: AccountRole): AccountStatus {
    return (type === 'seller' ? 'pending' : 'active');
  }

  public getCreateAccountDto() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      status: this.status,
    };
  }
}
