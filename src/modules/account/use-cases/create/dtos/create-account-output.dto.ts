import { Expose } from 'class-transformer';
import { AccountStatus } from 'modules/account/types/account-status.type';

export class CreateAccountOutputDto {
  @Expose() name!: string;
  @Expose() email!: string;
  @Expose() password!: string;
  @Expose() status!: AccountStatus;
}
