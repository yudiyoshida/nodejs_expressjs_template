import { Router } from 'express';
import { GetFaqByIdController } from './use-cases/get-faq-by-id/get-faq-by-id.controller';

const router = Router();

const getFaqByIdController = new GetFaqByIdController();

router.get('/', getFaqByIdController.handle);

export default router;
