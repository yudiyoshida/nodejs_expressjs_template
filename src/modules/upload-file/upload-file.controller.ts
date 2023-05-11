import { RequestHandler } from 'express';
import AppException from '@errors/app-exception';

class Controller {
  public upload: RequestHandler = async(req, res, next) => {
    try {
      const { location:url } = req.file as any ?? { location: null };
      res.status(201).json({ url });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
