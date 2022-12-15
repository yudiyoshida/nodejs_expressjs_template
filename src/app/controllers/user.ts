import { Request, Response, NextFunction } from 'express';
import { Status, User, UserType } from '@prisma/client';

import UserService from '@services/user';
import SecurityService from '@services/security';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

import ExcludeHelper from '@helpers/exclude';
import PaginationHelper from '@helpers/pagination';
import PasswordHelper from '@helpers/password';
import { Auth } from '@interfaces/auth';

class UserController {
  public findAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit = 10, page = 1, type, status } = req.query;

      // Se for admin, pode visualizar users ativos e inativos.
      // Caso contrário, só serão exibidos users ativos.
      const result = ((req.user as Auth).is_admin)
        ? await UserService.findAllUsers(Number(limit), Number(page), type as UserType, status as Status)
        : await UserService.findAllUsers(Number(limit), Number(page), type as UserType, Status.ativo);

      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findById = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.findUserById(Number(req.params.id));
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findMyself = async(req: Request, res: Response, next: NextFunction) => {
    try {
      let result = await UserService.findById((req.user as Auth).id);
      result = ExcludeHelper.excludeFields(result);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public createUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
      // Verifica se o email foi validado.
      const email = await SecurityService.findByEmail(req.body.email);
      if (!email) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);
      if (!email.validated) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);

      // Verifica se já existe um registro.
      const user = await UserService.findByUniqueFields(req.body);
      if (user) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Define valores padrões.
      req.body.type = UserType.app;
      req.body.status = Status.ativo;
      req.body.password = PasswordHelper.hash(req.body.password);

      // Separa as informações para cada entidade.
      const { address } = req.body;
      delete req.body.address;
      delete req.body.confirm_password;

      // Remove alguns campos e retorna o novo usuário.
      const result = await UserService.createUser(req.body, address);
      res.status(201).json(result[0]);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserService.findUserById(Number(req.params.id));
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await UserService.updateStatus((user as User).id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new UserController();
