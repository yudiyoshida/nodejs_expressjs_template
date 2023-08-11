import BaseController from '@abstracts/controller';
import Service from './text.service';

import { TextType } from '@prisma/client';

class Controller extends BaseController {
  public findOne = this.handleRequest((req) => {
    return Service.findOne(req.query.type as TextType);
  });

  public updateOne = this.handleRequest((req) => {
    return Service.updateOne(req.query.type as TextType, req.body);
  });
}

export default new Controller();
