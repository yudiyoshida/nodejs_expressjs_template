import { NextFunction, Request, Response } from 'express';
import AppException from '@errors/app-exception';

interface IHandleFunction {
  (req: Request): Promise<any>
}

abstract class BaseController {
  protected handleRequest(handle: IHandleFunction, statusCode?: number) {
    return async(req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await handle(req);
        res.status(statusCode ?? 200).json(response);

      } catch (err: any) {
        next(new AppException(err.status ?? 500, err.message));

      }
    };
  }
}

export default BaseController;
