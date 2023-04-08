import jwt from 'jsonwebtoken';

class JwtHelper {
  public createToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  }
}

export default new JwtHelper();
