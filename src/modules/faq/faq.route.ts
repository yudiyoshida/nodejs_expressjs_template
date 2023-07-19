import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Auth.isAuthenticated, Auth.isAdmin,
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.isAuthenticated, Auth.isAdmin,
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
