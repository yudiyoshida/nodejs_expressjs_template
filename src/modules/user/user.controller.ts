import { RequestHandler } from 'express';
import { Status, UserType } from '@prisma/client';

import UserFactory from './user.factory';
import Service from './user.service';
import AuthService from '../auth/auth.service';
import SecurityService from '../security/security.service';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, type, status } = req.query;

      const result = await Service.findAll(Number(limit), Number(page), type as UserType, status as Status);
      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findById: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(Number(req.params.id));
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findMyself: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(req.auth.id);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      const { user } = UserFactory.createUser(req.body);

      // Verifica se o email foi validado.
      const email = await SecurityService.findByValidatedEmail(user.email);
      if (!email) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);
      if (!email.validated) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);

      // Verifica se já existe um registro.
      const userExists = await AuthService.findByUniqueFields(user);
      if (userExists) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Cadastra o novo usuário.
      const result = await Service.create(user);
      res.status(201).json(result[0]);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateMyself: RequestHandler = async(req, res, next) => {
    try {
      const { user } = UserFactory.updateUser(req.body);

      // Verifica se já existe um registro.
      const userExists = await AuthService.findByUniqueFieldsExceptMe(req.auth.id, user);
      if (userExists) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      // Atualiza o usuário.
      const result = await Service.update(req.auth.id, user);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public deleteMyself: RequestHandler = async(req, res, next) => {
    try {
      const user = await Service.findById(req.auth.id);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      await Service.delete(user.id);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const user = await Service.findById(Number(req.params.id));
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await Service.updateStatus(user.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
