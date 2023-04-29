import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
.route('/faqs')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.queryParams,
  Controller.findAll,
);

router
.route('/faqs/:id')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.pathParams,
  Controller.findOne,
);



router
.route('/adm/faqs')
.get(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.createOne,
  Controller.createOne,
);

router
.route('/adm/faqs/:id')
.put(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.pathParams, Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.pathParams,
  Controller.deleteOne,
);

export default router;
