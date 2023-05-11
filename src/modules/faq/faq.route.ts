import { Router } from 'express';
import { Permissions } from '@prisma/client';

import Auth from '@middlewares/auth';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
);

router
.route('/')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
)
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.isAuthenticated, Auth.isAdmin, Auth.isAuthorized(Permissions.faqs),
  Validator.pathParams,
)
.get(
  Controller.findOne,
)
.put(
  Validator.updateOne,
  Controller.updateOne,
)
.delete(
  Controller.deleteOne,
);

export default router;
