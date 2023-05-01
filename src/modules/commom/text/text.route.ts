import { Router } from 'express';
import Controller from './text.controller';
import Validator from './text.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findOne,
);

export default router;
