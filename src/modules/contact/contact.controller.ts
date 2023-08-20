import Service from './contact.service';
import { TryCatch } from '@decorators/try-catch.decorator';
import { Request, Response } from 'express';

class Controller {
  @TryCatch()
  public async sendContactEmail(req: Request, res: Response) {
    const result = await Service.sendContactEmail(req.body);
    res.status(200).json(result);
  }
}

export default new Controller();
