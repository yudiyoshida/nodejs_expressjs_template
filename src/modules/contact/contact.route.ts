import { Router } from 'express';

import Controller from './contact.controller';
import Validator from './contact.validator';

const router = Router();

router
.route('/')
.post(
  Validator.sendContactMail,
  Controller.sendContactMail,
);

export default router;
