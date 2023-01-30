import { Router } from 'express';

import AdminPermissionRoutes from './admin-permission/admin-permission.route';
import AdminRoutes from './admin/admin.route';
import AuthRoutes from './auth/auth.route';
import ContactRoutes from './contact/contact.route';
import FAQRoutes from './faq/faq.route';
import TextRoutes from './text/text.route';
import UploadFileRoutes from './upload-file/upload.route';
import UserRoutes from './user/user.route';

const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes); // routes - controllers - services.
router.use('/admins', AdminRoutes); // routes - validators - controllers - services.
router.use('/auth', AuthRoutes); // routes - validators - controllers - services.
router.use('/contact', ContactRoutes); // routes - validators - controllers.
router.use('/faqs', FAQRoutes); // routes - validators - controllers - services.
router.use('/texts', TextRoutes); // routes - validators - controllers - services.
router.use('/upload-file', UploadFileRoutes); // routes - controllers.
router.use('/users', UserRoutes); // routes - validators - controllers - services.

export default router;
