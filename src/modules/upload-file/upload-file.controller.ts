import { Request, Response } from 'express';

class Controller {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async upload(req: Request, res: Response) {
    const url = req.file?.location ?? null;
    res.status(200).json({ url });
  }
}

export default new Controller();
