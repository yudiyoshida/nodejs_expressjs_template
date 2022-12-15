import { IAuth } from '../../modules/core/auth/dtos/interfaces/auth.dto';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: IAuth;
      multer: Express.Multer.File & Express.MulterS3.File
    }
  }
}
