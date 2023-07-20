import Repository from './user.repository';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class Service {
  public async findByCredential(credential: string) {
    const user = await Repository.findByCredential(credential);

    if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    else return user;
  }

  public async findByCredentialAndCode(credential: string, code: string) {
    const user = await Repository.findByCredentialAndCode(credential, code);

    if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
    else return user;
  }
}

export default new Service();
