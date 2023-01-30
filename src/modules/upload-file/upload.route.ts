import { Router } from 'express';

import multer from 'multer';
import multerOptions from '@config/storage';
import Controller from './upload.controller';

const router = Router();

router
  .route('/')
  .post(
    multer(multerOptions).single('image'),
    Controller.upload,
  );

export default router;
