import { injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { IAccountRepository, ICreateAccountDto } from '../account-repository.interface';

@injectable()
export class AccountInMemoryAdapterRepository implements IAccountRepository {
  private _accounts: Account[] = [];

  public async findAllPaginated(page: number, size: number): Promise<[Account[], number]> {
    const take = size;
    const skip = ((page - 1) * size);

    const accounts = this._accounts.slice(skip, skip + take);

    return [accounts, this._accounts.length] as [Account[], number];
  }

  public async findAll(): Promise<Account[]> {
    return this._accounts;
  }

  public async findById(id: string): Promise<Account | null> {
    const acc = this._accounts.find(item => item.id === id);

    return acc ?? null;
  }

  public async findByEmail(email: string): Promise<Account | null> {
    const acc = this._accounts.find(item => item.email === email);

    return acc ?? null;
  }

  public async save(data: ICreateAccountDto): Promise<Account> {
    const id = new Date().getTime().toString();
    const newAcc = { ...data, id };

    this._accounts.push(newAcc);

    return newAcc;
  }
}
