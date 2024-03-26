import { AccountRole } from '../types/account-role.type';
import { AccountStatus } from '../types/account-status.type';

export interface Account {
  id: string;
  role: AccountRole;
  name: string;
  email: string;
  password: string;
  status: AccountStatus;
}

export class AccountEntity {
  private _props: Account;

  constructor(props: Partial<Account>) {
    this._props = props as Account;
  }

  // Getters
  get role(): AccountRole {
    return this._props.role;
  }
  get name(): string {
    return this._props.name;
  }
  get email(): string {
    return this._props.email;
  }
  get password(): string {
    return this._props.password;
  }
  get status(): AccountStatus {
    return this._props.status;
  }

  // Business logic
  setStatus(role: AccountRole): void {
    this._props.status = role === 'seller' ? 'pending' : 'active';
  }

  hashPassword(password: string): void {
    this._props.password = password;
  }
}
