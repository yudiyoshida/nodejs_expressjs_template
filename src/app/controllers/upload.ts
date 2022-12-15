import { Request, Response, NextFunction } from 'express';
import AppException from '@errors/app-exception';

class UploadController {
  public upload = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, location:url } = req.file as any ?? { key: null, location: null };
      res.status(201).json({ key, url });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new UploadController();
