import { RequestHandler } from 'express';

import Service from './faq.service';
import AppException from '@errors/app-exception';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, search } = req.query;

      const response = await Service.findAll(+limit, +page, search as string);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findById: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Service.findById(+id);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public createOne: RequestHandler = async(req, res, next) => {
    try {
      const response = await Service.createOne(req.body);
      res.status(201).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Service.updateOne(+id, req.body);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public deleteOne: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const response = await Service.deleteOne(+id);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
