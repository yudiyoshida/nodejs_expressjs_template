import BaseController from '@abstracts/controller';

class Controller extends BaseController {
  public upload = this.handleRequest((req) => {
    const url = req.file?.location ?? null;
    return Promise.resolve({ url });
  });
}

export default new Controller();
