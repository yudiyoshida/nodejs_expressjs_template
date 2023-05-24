import { RequestHandler } from 'express';
import { AccountStatus } from '@prisma/client';
import { IPayloadDto } from './dtos/payload.dto';
import { LoginOutputDto } from './dtos/login.dto';
import { ForgotPasswordOutputDto, ResetPasswordOutputDto } from './dtos/password';

import AdminService from 'modules/admin/admin.service';
import UserService from 'modules/user/user.service';

import Mail from '@libs/nodemailer';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import CodeHelper from '@helpers/code';
import JwtHelper from '@helpers/token';
import PasswordHelper from '@helpers/password';

class Controller {
  public loginAdm: RequestHandler = async(req, res, next) => {
    try {
      const { credential, password } = req.body as LoginOutputDto;

      // find account.
      const admin = await AdminService.findByCredential(credential);

      // check password.
      PasswordHelper.comparePasswordAndHash(password, admin.password);

      // check if admin is active.
      if (admin.status === AccountStatus.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
      if (admin.status === AccountStatus.pendente) throw new AppException(403, ErrorMessages.PENDING);

      // generate token and send response.
      const { id, role, name, imageUrl } = admin;
      const payload: IPayloadDto = { id, role };

      res.status(200).json({
        token: JwtHelper.createToken(payload),
        account: { id, role, name, imageUrl },
      });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public loginUser: RequestHandler = async(req, res, next) => {
    try {
      const { credential, password } = req.body as LoginOutputDto;

      // find account.
      const user = await UserService.findByCredential(credential);

      // check password.
      PasswordHelper.comparePasswordAndHash(password, user.password);

      // check if user is active.
      if (user.status === AccountStatus.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
      if (user.status === AccountStatus.pendente) throw new AppException(403, ErrorMessages.PENDING);

      // generate token and send response.
      const { id, role, type, name, imageUrl } = user;
      const payload: IPayloadDto = { id, role, type };

      res.status(200).json({
        token: JwtHelper.createToken(payload),
        account: { id, role, type, name, imageUrl },
      });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPasswordAdm: RequestHandler = async(req, res, next) => {
    try {
      const { credential } = req.body as ForgotPasswordOutputDto;

      // find admin.
      const admin = await AdminService.findByCredential(credential);

      // generate and store code.
      const { code, codeExpiresIn } = CodeHelper.generate(15);
      await AdminService.storeCode(admin.id, code, codeExpiresIn);

      // send email with code.
      await Mail.sendEmail(admin.email, '[name] - Esqueceu sua senha?', 'forgot-password', { code });
      res.status(200).json({ message: 'Código de recuperação de senha enviado no seu email!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPasswordAdm: RequestHandler = async(req, res, next) => {
    try {
      const { credential, code, password } = req.body as ResetPasswordOutputDto;

      // find admin.
      const admin = await AdminService.findByCredentialAndCode(credential, code);

      // check if code is still valid.
      if (CodeHelper.isExpired(admin.codeExpiresIn as Date)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      // change password.
      await AdminService.changePassword(admin.id, PasswordHelper.hash(password));
      res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
