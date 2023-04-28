import { Router } from 'express';

import AuthRoutes from './commom/auth/auth.route';

import AdminPermissionRoutes from './admin/admin-permission/admin-permission.route';
import AdminRoutes from './admin/admin/admin.route';

const router = Router();

// rotas comuns.
router.use('/auth', AuthRoutes);

// portal gerencial.
router.use('/adm/admins/permissions', AdminPermissionRoutes);
router.use('/adm/admins', AdminRoutes);

export default router;
