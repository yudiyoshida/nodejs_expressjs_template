import { RequestHandler } from 'express';
import { CreateFaqDto } from './dtos/create-faq.dto';
import { UpdateFaqDto } from './dtos/update-faq.dto';

import Service from './faq.service';
import AppException from '@errors/app-exception';
import PaginationHelper from '@helpers/pagination';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1 } = req.query;

      const faqs = await Service.findAll(+limit, +page);
      const faqsPaginated = PaginationHelper.paginate(faqs, +limit, +page);
      res.status(200).json(faqsPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findOne: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const faq = await Service.findById(+id);
      res.status(200).json(faq);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public createOne: RequestHandler = async(req, res, next) => {
    try {
      const data = req.body as CreateFaqDto;

      const newFaq = await Service.create(data);
      res.status(201).json(newFaq);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    try {
      const data = req.body as UpdateFaqDto;
      const { id } = req.params;

      const faq = await Service.findById(+id);
      const result = await Service.update(faq.id, data);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public deleteOne: RequestHandler = async(req, res, next) => {
    try {
      const { id } = req.params;

      const faq = await Service.findById(+id);
      await Service.delete(faq.id);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
