import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import multer from 'multer';

import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from '@config/swagger';

import routes from './modules/index.routes';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.globalErrorHandlerRoute();
  }

  middlewares() {
    this.app.use('/files', express.static(process.env.STORAGE_LOCAL as string));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(helmet());
  }

  // Desabilitar a rota do swagger quando fizer deploy em produção.
  routes() {
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerOptions), { explorer: true }));
    this.app.use(routes);
  }

  globalErrorHandlerRoute() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err instanceof AppException) {
        return res.status(err.status).json({ error: err.message });

      } else if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });

      } else {
        return res.status(500).json({ error: ErrorMessages.INTERNAL_SERVER_ERROR });

      }
    });
  }
}

export default new App().app;
