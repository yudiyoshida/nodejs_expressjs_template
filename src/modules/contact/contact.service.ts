import { IContactEmail } from '../mail/dtos/contact-email.dto';
import Mail from '@libs/nodemailer';

class Service {
  public async sendContactMail(content: IContactEmail) {
    await Mail.sendEmail(process.env.SMTP_TO as string, 'Alguém entrou em contato!', 'contact', content);

    return { message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' };
  }
}

export default new Service();
