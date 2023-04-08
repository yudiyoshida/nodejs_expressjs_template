import { IAdminPermissionDto } from 'modules/admin-permission/dtos/admin-permission.dto';

export interface AuthDto {
  id: number;
  isAdmin: boolean;
  type: string;
  permissions: IAdminPermissionDto[]
}
