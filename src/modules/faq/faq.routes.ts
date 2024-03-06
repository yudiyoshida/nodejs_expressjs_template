import { Router } from 'express';

import { CreateFaqController } from './use-cases/create-faq/create-faq.controller';
import { GetFaqByIdController } from './use-cases/get-faq-by-id/get-faq-by-id.controller';

const router = Router();

const getFaqByIdController = new GetFaqByIdController();
const createFaqController = new CreateFaqController();

router.post('/', createFaqController.handle);
router.get('/:id', getFaqByIdController.handle);

export default router;
