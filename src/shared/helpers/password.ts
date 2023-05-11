import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class PasswordHelper {
  public comparePasswordAndConfirmation(password: string, confirmation: string) {
    return (password === confirmation);
  }

  public comparePasswordAndHash(password: string, hash: string) {
    const isPasswordCorrect = bcryptjs.compareSync(password, hash);
    if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
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
