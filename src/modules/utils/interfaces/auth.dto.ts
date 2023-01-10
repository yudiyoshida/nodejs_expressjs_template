import { IGetAdminPermission } from './admin-permission.dto';

export interface IAuth {
  id: number;
  isAdmin: boolean;
  type: string;
  permissions: IGetAdminPermission[];
}
