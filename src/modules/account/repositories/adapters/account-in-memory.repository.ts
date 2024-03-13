import { injectable } from 'inversify';
import { IAccount } from 'modules/account/entities/account.entity';
import { CreateAccountOutputDto } from 'modules/account/use-cases/create/dtos/create-account-output.dto';
import { IAccountRepository } from '../account-repository.interface';

@injectable()
export class AccountInMemoryAdapterRepository implements IAccountRepository {
  private _accounts: IAccount[] = [];

  public async findAllPaginated(page: number, size: number): Promise<[IAccount[], number]> {
    const take = size;
    const skip = ((page - 1) * size);

    const accounts = this._accounts.slice(skip, skip + take);

    return [accounts, this._accounts.length] as [IAccount[], number];
  }

  public async findAll(): Promise<IAccount[]> {
    return this._accounts;
  }

  public async findById(id: string): Promise<IAccount | null> {
    const acc = this._accounts.find(item => item.id === id);

    return acc ?? null;
  }

  public async findByEmail(email: string): Promise<IAccount | null> {
    const acc = this._accounts.find(item => item.email === email);

    return acc ?? null;
  }

  public async save(data: CreateAccountOutputDto): Promise<IAccount> {
    const id = new Date().getTime().toString();
    const newAcc = { ...data, id };

    this._accounts.push(newAcc);

    return newAcc;
  }
}
