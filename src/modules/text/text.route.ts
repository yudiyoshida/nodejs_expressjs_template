import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './text.controller';
import Validator from './text.validator';

const router = Router();

router
  .route('/texts')
  .get(
    Validator.queryParams,
    Controller.findByType,
  )
  .put(
    Auth.isAuthenticated, Auth.isAdmin,
    Validator.queryParams, Validator.update,
    Controller.update,
  );

export default router;
