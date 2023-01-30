import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from 'shared/middlewares/auth';
import Controller from './text.controller';
import Validator from './text.validator';

const router = Router();

router
  .route('/')
  .get(
    Validator.queryParams,
    Controller.findByType,
  )
  .put(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.texts),
    Validator.queryParams, Validator.update,
    Controller.update,
  );

export default router;
