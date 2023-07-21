import MailService from 'modules/mail/mail.service';
import { IContactEmail } from '../mail/dtos/contact-email.dto';

class Service {
  public async sendContactMail(content: IContactEmail) {
    await MailService.sendContactEmail(content);

    return { message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' };
  }
}

export default new Service();
