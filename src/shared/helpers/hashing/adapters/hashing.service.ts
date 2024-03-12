import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { IHashingService } from '../hashing-service.interface';

@injectable()
export class BcryptAdapterService implements IHashingService {
  public compare(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  public hash(text: string, saltOrRounds?: string | number): string {
    return bcrypt.hashSync(text, saltOrRounds || 10);
  }
}
