import { RequestHandler } from 'express';
import AppException from '@errors/app-exception';

class Controller {
  public upload: RequestHandler = async(req, res, next) => {
    try {
      const { key, location:url } = req.file as any ?? { key: null, location: null };
      res.status(201).json({ key, url });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
