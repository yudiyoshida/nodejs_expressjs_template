import Service from './admin-permission.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async findAll(req: Request, res: Response) {
    const result = await Service.findAll();
    res.status(200).json(result);
  }
}

export default new Controller();
