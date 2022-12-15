import { Router } from 'express';

import Controller from './contact.controller';
import Validator from './contact.validator';

const router = Router();

router
  .route('/')
  .post(
    Validator.sendEmail,
    Controller.sendEmail,
  );

export default router;
