import { Router } from 'express';

import { LoginController } from './use-cases/login/login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/login', loginController.handle);

export default router;
