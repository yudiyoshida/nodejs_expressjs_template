import { Router } from 'express';

import AdminRoutes from './admin/admin.route';
import AdminPermissionRoutes from './admin-permission/admin-permission.route';
import AuthRoutes from './auth/auth.route';
import ContactRoutes from './contact/contact.route';
import FAQRoutes from './faq/faq.route';
import TextRoutes from './text/text.route';
import UploadFileRoutes from './upload-file/upload.route';
import UserRoutes from './user/user.route';

const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes); // routes - controllers - services (admin-permission).
router.use('/admins', AdminRoutes); // routes - validators - controllers - services (admin).
router.use('/auth', AuthRoutes); // routes - validators - controllers - services (user e security).
router.use('/contact', ContactRoutes); // routes - validators - controllers.
router.use('/faqs', FAQRoutes); // routes - validators - controllers - services (faq).
router.use('/texts', TextRoutes); // routes - validators - controllers - services (text).
router.use('/upload-file', UploadFileRoutes); // routes - controllers.
router.use('/users', UserRoutes); // routes - validators - controllers - services (user).

export default router;
