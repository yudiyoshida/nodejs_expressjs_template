import { IAdminPermission } from '@interfaces/admin-permission.dto';

export interface IAuth {
  id: number;
  isAdmin: boolean;
  type: string;
  permissions: IAdminPermission[];
}
