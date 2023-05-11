import { RequestHandler } from 'express';

import AppException from '@errors/app-exception';
import Mail from '@libs/nodemailer';

class Controller {
  public sendEmail: RequestHandler = async(req, res, next) => {
    try {
      await Mail.sendEmail(process.env.SMTP_TO as string, 'Alguém entrou em contato!', 'contact', req.body);
      res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
