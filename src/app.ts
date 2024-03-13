import 'express-async-errors';
import 'reflect-metadata';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import https from 'https';
import multer from 'multer';

import sslOptions from './config/ssl';
import swaggerOptions from './config/swagger';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { AppException } from './errors/app-exception';
import { Errors } from './errors/error-messages';

import routes from './modules/index.routes';

class App {
  public app: express.Application;
  public server: http.Server | https.Server;

  constructor() {
    this.app = express();
    this.server = (process.env.NODE_ENV === 'production')
      ? https.createServer(sslOptions, this.app)
      : http.createServer(this.app);

    this.registerMiddlewares();
    this.registerRoutes();
    this.registerGlobalErrorHandlerRoute();
  }

  private registerMiddlewares() {
    this.app.use('/files', express.static(process.env.STORAGE_LOCAL as string));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(helmet());
  }

  private registerRoutes() {
    this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(swaggerOptions), { explorer: true }));
    this.app.use(routes);
  }

  private registerGlobalErrorHandlerRoute() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log(err);

      if (err instanceof AppException) {
        res.status(err.status).json({ error: err.error });

      } else if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });

      } else {
        res.status(500).json({ error: Errors.INTERNAL_SERVER_ERROR });

      }
    });
  }
}

export default new App();
