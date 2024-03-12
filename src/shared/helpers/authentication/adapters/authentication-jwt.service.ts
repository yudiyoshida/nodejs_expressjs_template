import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { IAuthenticationService } from '../authentication-service.interface';

@injectable()
export class AuthenticationJwtAdapterService implements IAuthenticationService {
  public sign(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  }
}
