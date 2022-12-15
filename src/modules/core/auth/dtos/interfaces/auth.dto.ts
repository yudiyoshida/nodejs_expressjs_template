import { IGetAdminPermission } from '../../../admin-permission/dtos/interfaces/admin-permission.dto';

export interface IAuth {
  id: number;
  isAdmin: boolean;
  type: string;
  permissions: IGetAdminPermission[];
}
