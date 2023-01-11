import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

class PasswordHelper {
  public compare(password: string, confirmation: string) {
    return (password === confirmation);
  }
  
  public generate() {
    return crypto.randomBytes(12).toString('hex').slice(0, 8);
  }

  public hash(password: string) {
    const salt = bcryptjs.genSaltSync(8);
    return bcryptjs.hashSync(password, salt);
  }
}

export default new PasswordHelper();
