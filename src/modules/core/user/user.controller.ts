import { RequestHandler } from 'express';
import { Status, UserType } from '@prisma/client';
import { UserWithAddressesDTO } from './dtos/user.dto';

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

      // Se for admin, serão exibidos users ativos e inativos.
      // Caso contrário, só serão exibidos users ativos.
      const result = (req.auth.isAdmin)
        ? await Service.findAllUsers(Number(limit), Number(page), type as UserType, status as Status)
        : await Service.findAllUsers(Number(limit), Number(page), type as UserType, Status.ativo);

      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findById: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(Number(req.params.id), UserWithAddressesDTO);
      if (!result) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);
      else res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findMyself: RequestHandler = async(req, res, next) => {
    try {
      const result = await Service.findById(req.auth.id, UserWithAddressesDTO);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      const { user, address } = req.body;

      // Verifica se o email foi validado.
      const email = await SecurityService.findByValidatedEmail(user.email);
      if (!email) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);
      if (!email.validated) throw new AppException(400, ErrorMessages.EMAIL_NOT_VALIDATED);

      // Verifica se já existe um registro.
      const userExists = await AuthService.findByUniqueFields(user);
      if (userExists) throw new AppException(409, ErrorMessages.USER_ALREADY_EXISTS);

      const [result] = await Service.create(user, address);
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateStatus: RequestHandler = async(req, res, next) => {
    try {
      const user = await Service.findById(Number(req.params.id), UserWithAddressesDTO);
      if (!user) throw new AppException(404, ErrorMessages.USER_NOT_FOUND);

      const result = await Service.updateStatus(user.id, req.body.status);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
