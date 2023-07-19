import Mail from '@libs/nodemailer';
import { IContactEmail } from './dtos/contact-email.dto';
import { IForgotPasswordEmail } from './dtos/forgot-password-email.dto';

class Service {
  public sendContactEmail(content: IContactEmail) {
    return Mail.sendEmail(process.env.SMTP_TO as string, 'Alguém entrou em contato!', 'contact', content);
  }

  public sendForgotPasswordEmail(email: string, content: IForgotPasswordEmail) {
    return Mail.sendEmail(email, '[name] - Esqueceu sua senha?', 'forgot-password', content);
  }
}

export default new Service();
