import BaseController from '@abstracts/controller';
import Service from './contact.service';

class Controller extends BaseController {
  public sendContactEmail = this.handleRequest((req) => {
    return Service.sendContactEmail(req.body);
  });
}

export default new Controller();
