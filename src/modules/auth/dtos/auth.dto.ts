import { IAdminPermissionDto } from 'modules/admin-permission/dtos/admin-permission.dto';

export interface IAuthDto {
  id: number;
  isAdmin: boolean;
  type: string;
  permissions: IAdminPermissionDto[]
}
