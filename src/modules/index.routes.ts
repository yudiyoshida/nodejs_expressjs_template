import { Router } from 'express';

import AuthRoutes from './commom/auth/auth.route';
import UploadFileRoutes from './commom/upload-file/upload-file.route';
import FaqRoutes from './commom/faq/faq.route';

import AdmAdminPermissionRoutes from './admin/admin-permission/admin-permission.route';
import AdmAdminRoutes from './admin/admin/admin.route';
import AdmFaqRoutes from './admin/faq/faq.route';

const router = Router();

// rotas comuns.
router.use('/auth', AuthRoutes);
router.use('/upload-file', UploadFileRoutes);
router.use('/faqs', FaqRoutes);

// portal gerencial.
router.use('/adm/admins/permissions', AdmAdminPermissionRoutes);
router.use('/adm/admins', AdmAdminRoutes);
router.use('/adm/faqs', AdmFaqRoutes);

export default router;
