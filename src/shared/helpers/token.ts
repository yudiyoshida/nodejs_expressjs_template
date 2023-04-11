import jwt from 'jsonwebtoken';
import { IAuthDto } from 'modules/auth/dtos/auth.dto';

class JwtHelper {
  public createToken(payload: IAuthDto) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  }
}

export default new JwtHelper();
