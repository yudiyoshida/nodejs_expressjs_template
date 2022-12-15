import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import Mail from '@lib/nodemailer';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import UserService from '@services/user';
import SecurityService from '@services/security';

import CodeHelper from '@helpers/code';
import ExcludeHelper from '@helpers/exclude';
import PasswordHelper from '@helpers/password';

import { Status, User } from '@prisma/client';
import { Auth } from '@interfaces/auth';

class AuthController {
  public login = async(req: Request, res: Response, next: NextFunction) => {
    try {
      let user = await UserService.findByUserName(req.body.username);
      if (!user) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);
      if (user.status !== Status.ativo) throw new AppException(403, ErrorMessages.FORBIDDEN);

      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_CREDENTIALS);

      const { id, is_admin, type, permissions } = user;
      const token = jwt.sign({ id, is_admin, type, permissions }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
      user = ExcludeHelper.excludeFields(user);
      res.status(200).json({ token, user });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public forgotPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const user = await UserService.findByEmail(email);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      if (user.status !== Status.ativo) throw new AppException(403, ErrorMessages.FORBIDDEN);

      const { code, code_expires_in } = CodeHelper.generate(60);
      await UserService.storeCode(user.id, code, code_expires_in);

      await Mail.sendEmail(email, '[name] - Esqueceu sua senha?', 'forgot-password', { code });
      res.status(200).json({ message: 'Código de recuperação de senha enviado no seu email!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public resetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code, password } = req.body;

      const user = await UserService.findByEmailAndCode(email, code);
      if (!user) throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);

      if (CodeHelper.isExpired(user.code_expires_in as Date)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      user.password = PasswordHelper.hash(password);
      await UserService.changePassword(user.id, user.password);
      res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updatePassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { current_password, new_password } = req.body;
      const id = Number((req.user as Auth).id);
      const user = await UserService.findById(Number(id));

      const isPasswordCorrect = bcrypt.compareSync(current_password, (user as User).password);
      if (!isPasswordCorrect) throw new AppException(400, ErrorMessages.INVALID_PASSWORD);

      // TODO: Refactoring! (user as User)
      (user as User).password = PasswordHelper.hash(new_password);
      await UserService.changePassword((user as User).id, (user as User).password);
      res.status(200).json({ message: 'Senha atualizada com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public validateFields = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.findByUniqueFields(req.body);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      const { code, code_expires_in } = CodeHelper.generate(5);
      await SecurityService.storeCode(req.body.email, code, code_expires_in);

      await Mail.sendEmail(req.body.email, '[name] - Confirme o seu email!', 'validate-email', { code });
      res.status(200).json({ message: 'Código de confirmação enviado no seu email!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public validateCode = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body;

      const user = await SecurityService.findByEmailAndCode(email, code);
      if (!user) throw new AppException(404, ErrorMessages.INCORRECT_CODE_PASS);

      if (CodeHelper.isExpired(user.code_expires_in as Date)) throw new AppException(400, ErrorMessages.CODE_EXPIRED);

      await SecurityService.validateCode(user.id);
      res.status(200).json({ message: 'Email validado com sucesso!' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new AuthController();
