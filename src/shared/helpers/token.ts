import jwt from 'jsonwebtoken';
import { IAuthDto } from 'modules/commom/auth/dtos/auth.dto';

class JwtHelper {
  public createToken(payload: IAuthDto) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
  }
}

export default new JwtHelper();
