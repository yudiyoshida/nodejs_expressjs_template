import { Request, Response } from 'express';

class Controller {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async upload(req: Request, res: Response) {
    const url = req.file?.location ?? null;
    return { url };
  }
}

export default new Controller();
