import { Router } from 'express';

import { CreateAccountController } from './use-cases/create-account/create-account.controller';

const router = Router();

const createAccountController = new CreateAccountController();

router.post('/', createAccountController.handle);

export default router;
