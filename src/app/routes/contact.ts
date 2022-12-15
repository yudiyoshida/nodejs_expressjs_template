import { Router } from 'express';

import ContactController from '@controllers/contact';
import ContactValidator from '@validators/contact';

const router = Router();

router
  .route('/')
  .post(
    ContactValidator.sendEmail,
    ContactController.sendEmail,
  );

export default router;
