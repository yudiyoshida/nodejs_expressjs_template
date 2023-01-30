import { Router } from 'express';
import { AdminPermission } from '@prisma/client';

import Auth from 'shared/middlewares/auth';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
  .route('/')
  .get(
    Controller.findAll,
  )
  .post(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.faqs),
    Validator.upsert,
    Controller.create,
  );

router
  .route('/:id')
  .put(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.faqs),
    Validator.pathParams, Validator.upsert,
    Controller.update,
  )
  .delete(
    Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(AdminPermission.faqs),
    Validator.pathParams,
    Controller.delete,
  );

export default router;
