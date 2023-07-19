import { RequestHandler } from 'express';
import { SendEmailDto } from './dtos/send-email.dto';

import Service from './contact.service';
import AppException from '@errors/app-exception';

class Controller {
  public sendContactMail: RequestHandler = async(req, res, next) => {
    try {
      const data = req.body as SendEmailDto;

      const response = await Service.sendContactMail(data);
      res.status(200).json(response);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
