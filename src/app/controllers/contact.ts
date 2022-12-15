import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';

import Mail from '@lib/nodemailer';
import AppException from '@errors/app-exception';

class ContactController {
  public sendEmail = async(req: Request, res: Response, next: NextFunction) => {
    try {
      await Mail.sendEmail(process.env.SMTP_TO as string, 'Alguém entrou em contato!', 'contact', req.body);
      res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new ContactController();
