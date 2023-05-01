import { Router } from 'express';
import Controller from './faq.controller';
import Validator from './faq.validator';

const router = Router();

router
.route('/')
.get(
  Validator.queryParams,
  Controller.findAll,
);

export default router;
