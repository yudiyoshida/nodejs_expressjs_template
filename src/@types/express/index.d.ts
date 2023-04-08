import { IAuthDto } from 'modules/auth/dtos/auth.dto';

// to make the file a module and avoid the TypeScript error.
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: IAuthDto;
      multer: Express.Multer.File & Express.MulterS3.File;
    }
  }
}
