import BaseController from '@abstracts/controller';
import Service from './admin-permission.service';

class Controller extends BaseController {
  public findAll = this.handleRequest(() => {
    return Service.findAll();
  });
}

export default new Controller();
