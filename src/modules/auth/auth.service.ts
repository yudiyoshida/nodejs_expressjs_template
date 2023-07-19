import { AccountStatus, Admin, User } from '@prisma/client';
import { IPayloadDto } from './dtos/payload.dto';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dtos/password';

import AdminService from '../admin/admin.service';
import UserService from '../user/user.service';

import MailService from '../mail/mail.service';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import CodeHelper from '@helpers/code';
import JwtHelper from '@helpers/token';
import PasswordHelper from '@helpers/password';

class Service {
  public loginAdm = async(data: LoginDto) => {
    // find account.
    const admin = await AdminService.findByCredential(data.credential);

    // check password (will throw an error if password is incorrect).
    this.checkIfPasswordAndHashMatch(data.password, admin.password);

    // check if admin is active.
    this.checkIfAccountIsActive(admin);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: admin.id,
      role: admin.role,
      name: admin.name,
    };

    return {
      token: JwtHelper.createToken(payload),
      account: payload,
    };
  };

  public loginUser = async(data: LoginDto) => {
    // find account.
    const user = await UserService.findByCredential(data.credential);

    // check password (will throw an error if password is incorrect).
    this.checkIfPasswordAndHashMatch(data.password, user.password);

    // check if user is active.
    this.checkIfAccountIsActive(user);

    // generate token and account object.
    const payload: IPayloadDto = {
      id: user.id,
      role: user.role,
      type: user.type,
      name: user.name,
    };

    return {
      token: JwtHelper.createToken(payload),
      account: payload,
    };
  };


  public forgotPasswordAdm = async(data: ForgotPasswordDto) => {
    // find admin.
    const admin = await AdminService.findByCredential(data.credential);

    // generate and store code.
    const minutes = 15;
    const { code, codeExpiresIn } = CodeHelper.generate(minutes);
    await AdminService.storeCode(admin.id, code, codeExpiresIn);

    // send an email with code.
    await MailService.sendForgotPasswordEmail(admin.email, { code, minutes });
    return { message: 'Código de recuperação de senha enviado no seu email!' };
  };

  public forgotPasswordUser = async(data: ForgotPasswordDto) => {
    // find user.
    const user = await UserService.findByCredential(data.credential);

    // generate and store code.
    const minutes = 15;
    const { code, codeExpiresIn } = CodeHelper.generate(minutes);
    await UserService.storeCode(user.id, code, codeExpiresIn);

    // send an email with code.
    await MailService.sendForgotPasswordEmail(user.email, { code, minutes });
    return { message: 'Código de recuperação de senha enviado no seu email!' };
  };


  public resetPasswordAdm = async(data: ResetPasswordDto) => {
    // find admin.
    const admin = await AdminService.findByCredentialAndCode(data.credential, data.code);

    // check code validation.
    this.checkIfCodeIsNotExpired(admin.codeExpiresIn as Date);

    // change password.
    await AdminService.changePassword(admin.id, PasswordHelper.hash(data.password));
    return { message: 'Senha atualizada com sucesso!' };
  };

  public resetPasswordUser = async(data: ResetPasswordDto) => {
    // find user.
    const user = await UserService.findByCredentialAndCode(data.credential, data.code);

    // check code validation.
    this.checkIfCodeIsNotExpired(user.codeExpiresIn as Date);

    // change password.
    await UserService.changePassword(user.id, PasswordHelper.hash(data.password));
    return { message: 'Senha atualizada com sucesso!' };
  };


  private checkIfPasswordAndHashMatch(password: string, hashedPassword: string) {
    const isMatch = PasswordHelper.comparePasswordAndHash(password, hashedPassword);
    if (!isMatch) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
  }

  private checkIfAccountIsActive(account: Admin | User) {
    if (account.status === AccountStatus.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
    if (account.status === AccountStatus.pendente) throw new AppException(403, ErrorMessages.PENDING);
  }

  private checkIfCodeIsNotExpired(codeExpiresIn: Date) {
    const isExpired = CodeHelper.isExpired(codeExpiresIn);
    if (isExpired) throw new AppException(400, ErrorMessages.CODE_EXPIRED);
  }
}

export default new Service();
