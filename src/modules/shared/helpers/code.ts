import crypto from 'crypto';

class CodeHelper {
  public generate(minutes: number) {
    const now = new Date();
    const code = crypto.randomBytes(12).toString('hex').slice(0, 4);
    const codeExpiresIn = new Date(now.setMinutes(now.getMinutes() + minutes));

    return { code, codeExpiresIn };
  }

  public isExpired(codeExpiresIn: Date) {
    const now = new Date();
    return (codeExpiresIn.getTime() - now.getTime() <= 0);
  }
}

export default new CodeHelper();
