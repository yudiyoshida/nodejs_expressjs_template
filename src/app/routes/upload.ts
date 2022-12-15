import { Router } from 'express';

import multer from 'multer';
import multerOptions from '@config/storage';
import UploadController from '@controllers/upload';

const router = Router();

router
  .route('/')
  .post(
    multer(multerOptions).single('image'),
    UploadController.upload,
  );

export default router;
