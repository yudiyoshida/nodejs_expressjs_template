import { RequestHandler } from 'express';

import Service from './faq.service';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';
import Faq from './faq.entity';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1 } = req.query;

      const result = await Service.findAll(Number(limit), Number(page));
      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create: RequestHandler = async(req, res, next) => {
    try {
      const faq = this.faqCreateInput(req.body);

      const result = await Service.save(faq);
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public update: RequestHandler = async(req, res, next) => {
    try {
      let faq = await Service.findById(Number(req.params.id));
      if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);

      faq = this.faqUpdateInput(faq, req.body);

      const result = await Service.save(faq);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public delete: RequestHandler = async(req, res, next) => {
    try {
      const faq = await Service.findById(Number(req.params.id));
      if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);

      await Service.delete(faq);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  private faqCreateInput(body: Faq) {
    const faq = new Faq();
    faq.question = body.question;
    faq.answer = body.answer;

    return faq;
  }

  private faqUpdateInput(faq: Faq, body: Faq) {
    faq.question = body.question;
    faq.answer = body.answer;

    return faq;
  }
}

export default new Controller();
