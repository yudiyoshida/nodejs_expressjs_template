import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
  .route('/faqs')
  .get(
    Validator.queryParams,
    Controller.findAll,
  )
  .post(
    Auth.isAuthenticated, Auth.isAdmin,
    Validator.upsert,
    Controller.create,
  );

router
  .route('/faqs/:id')
  .put(
    Auth.isAuthenticated, Auth.isAdmin,
    Validator.pathParams, Validator.upsert,
    Controller.update,
  )
  .delete(
    Auth.isAuthenticated, Auth.isAdmin,
    Validator.pathParams,
    Controller.delete,
  );

export default router;
