import { IAdminPermission } from '@interfaces/admin-permission';

export interface IAuth {
  id: number;
  isAdmin: boolean;
  type: string;
  permissions: IAdminPermission[];
}
