import bcrypt from 'bcryptjs';
import crypto from 'crypto';

class PasswordHelper {
  generate() {
    return crypto.randomBytes(12).toString('hex').slice(0, 8);
  }

  hash(password: string) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(password, salt);
  }

  compare(password: string, confirmation: string) {
    return (password === confirmation);
  }
}

export default new PasswordHelper();
