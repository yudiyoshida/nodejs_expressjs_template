import crypto from 'crypto';

class CodeHelper {
  generate(minutes: number) {
    const now = new Date();
    const code = crypto.randomBytes(12).toString('hex').slice(0, 4);
    const code_expires_in = new Date(now.setMinutes(now.getMinutes() + minutes));

    return { code, code_expires_in };
  }

  isExpired(code_expires_in: Date) {
    const now = new Date();
    return (code_expires_in.getTime() - now.getTime() <= 0);
  }
}

export default new CodeHelper();
