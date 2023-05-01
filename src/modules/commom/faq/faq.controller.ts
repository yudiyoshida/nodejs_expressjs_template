import { RequestHandler } from 'express';

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

}

export default new Controller();
