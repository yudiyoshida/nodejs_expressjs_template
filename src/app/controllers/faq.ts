import { Request, Response, NextFunction } from 'express';

import FaqService from '@services/faq';
import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import PaginationHelper from '@helpers/pagination';

class FaqController {
  public findAll = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit = 10, page = 1 } = req.query;

      const result = await FaqService.findAll(Number(limit), Number(page));
      const resultPaginated = PaginationHelper.paginate(result, Number(limit), Number(page));
      res.status(200).json(resultPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public create = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await FaqService.create(req.body);
      res.status(201).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public update = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const faq = await FaqService.findById(Number(req.params.id));
      if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);

      const result = await FaqService.update(faq.id, req.body);
      res.status(200).json(result);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public delete = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const faq = await FaqService.findById(Number(req.params.id));
      if (!faq) throw new AppException(404, ErrorMessages.FAQ_NOT_FOUND);

      await FaqService.delete(faq.id);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new FaqController();
