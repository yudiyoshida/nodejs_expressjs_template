import BaseController from '@abstracts/controller';
import Service from './faq.service';

class Controller extends BaseController {
  public findAll = this.handleRequest((req) => {
    const { limit = 10, page = 1, search } = req.query;
    return Service.findAll(+limit, +page, search as string);
  });

  public findOne = this.handleRequest((req) => {
    return Service.findOne(+req.params.id);
  });

  public createOne = this.handleRequest((req) => {
    return Service.createOne(req.body);
  }, 201);

  public updateOne = this.handleRequest((req) => {
    return Service.updateOne(+req.params.id, req.body);
  });

  public deleteOne = this.handleRequest((req) => {
    return Service.deleteOne(+req.params.id);
  });
}

export default new Controller();
