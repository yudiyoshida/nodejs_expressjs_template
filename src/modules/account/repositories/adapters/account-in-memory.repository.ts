import { injectable } from 'inversify';
import { IAccount } from 'modules/account/entities/account.entity';
import { IAccountRepository } from '../account-repository.interface';

@injectable()
export class AccountInMemoryAdapterRepository implements IAccountRepository {
  private _accounts: IAccount[] = [];

  public async findByEmail(email: string): Promise<IAccount | null> {
    const acc = this._accounts.find(item => item.email === email);

    return acc ?? null;
  }

  public async save(data: IAccount): Promise<IAccount> {
    const id = new Date().getTime().toString();
    const newAcc = { ...data, id };

    this._accounts.push(newAcc);

    return newAcc;
  }
}
