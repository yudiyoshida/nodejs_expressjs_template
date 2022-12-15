import { Router } from 'express';

import AdminRoutes from './admin';
import AuthRoutes from './auth';
import ContactRoutes from './contact';
import FAQRoutes from './faq';
import TextRoutes from './text';
import UploadRoutes from './upload';
import UserRoutes from './user';

const router = Router();

router.use('/admins', AdminRoutes); // routes - validators - controllers - services (user).
router.use('/auth', AuthRoutes); // routes - validators - controllers - services (user e security).
router.use('/contact', ContactRoutes); // routes - validators - controllers.
router.use('/faqs', FAQRoutes); // routes - validators - controllers - services (faq).
router.use('/texts', TextRoutes); // routes - validators - controllers - services (text).
router.use('/upload-file', UploadRoutes); // routes - controllers.
router.use('/users', UserRoutes); // routes - validators - controllers - services (user).

export default router;
