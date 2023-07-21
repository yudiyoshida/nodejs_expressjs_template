import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './text.controller';
import Validator from './text.validator';

const router = Router();

router
.route('/')
.all(
  Validator.queryParams,
)
.get(
  Controller.findByType,
)
.put(
  Auth.authentication, Auth.roles('admin'),
  Validator.updateOne,
  Controller.updateOne,
);

export default router;
