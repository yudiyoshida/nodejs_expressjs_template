import { RequestHandler } from 'express';
import { Status } from '@prisma/client';
import { IAuth } from 'utils/interfaces/auth.dto';
import { AccountAllFieldsDTO, AccountWithPermissionsDTO } from './dtos/account.dto';

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Service from './auth.service';
import SecurityService from '../security/security.service';

import Mail from '@libs/nodemailer';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import CodeHelper from 'shared/helpers/code';
import PasswordHelper from 'shared/helpers/password';

class Controller {
  public login: RequestHandler = async(req, res, next) => {
    try {
      const user = await Service.findByUserName(req.body.username);
      if (!user) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
      if (user.status === Status.pendente) throw new AppException(403, ErrorMessages.PENDING);
      if (user.status === Status.inativo) throw new AppException(403, ErrorMessages.INACTIVE);
      if (user.status !== Status.ativo) throw new AppException(403, ErrorMessages.FORBIDDEN);

      const isPasswordCorrect = bcryptjs.compareSync(req.body.password, user.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      const payload: IAuth = {
        id: user.id,
        isAdmin: user.isAdmin,
        type: user.type,
        permissions: user.permissions,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' });
      const account = await Service.findById(user.id, AccountWithPermissionsDTO);
      res.status(200).json({ token, account });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPassword: RequestHandler = async(req, res, next) => {
    try {
      const { email } = req.body;

      const user = await Service.findByEmail(email);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      if (user.status !== Status.ativo) throw new AppException(403, ErrorMessages.FORBIDDEN);

      const { code, codeExpiresIn } = CodeHelper.generate(15);
      await Service.storeCode(user.id, code, codeExpiresIn);

      await Mail.sendEmail(email, '[name] - Esqueceu sua senha?', 'forgot-password', { code });
      res.status(200).json({ message: 'Código de recuperação de senha enviado no seu email!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPassword: RequestHandler = async(req, res, next) => {
    try {
      const { email, code, password } = req.body;

      const user = await Service.findByEmailAndCode(email, code);
      if (!user) throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);

      // Checa se token ainda é válido.
      if (CodeHelper.isExpired(user.codeExpiresIn as Date)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      await Service.changePassword(user.id, PasswordHelper.hash(password));
      res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updatePassword: RequestHandler = async(req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await Service.findById(req.auth.id, AccountAllFieldsDTO);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const isPasswordCorrect = bcryptjs.compareSync(currentPassword, user.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_PASSWORD);

      await Service.changePassword(user.id, PasswordHelper.hash(newPassword));
      res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public validateFields: RequestHandler = async(req, res, next) => {
    try {
      const user = await Service.findByUniqueFields(req.body);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      const { code, codeExpiresIn } = CodeHelper.generate(5);
      await SecurityService.storeCode(req.body.email, code, codeExpiresIn);

      await Mail.sendEmail(req.body.email, '[name] - Confirme o seu email!', 'validate-email', { code });
      res.status(200).json({ message: 'Código de confirmação enviado no seu email!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public validateCode: RequestHandler = async(req, res, next) => {
    try {
      const { email, code } = req.body;

      const user = await SecurityService.findByEmailAndCode(email, code);
      if (!user) throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);

      // Checa se token ainda é válido.
      if (CodeHelper.isExpired(user.codeExpiresIn as Date)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      await SecurityService.validateCode(user.id);
      res.status(200).json({ message: 'Email validado com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
