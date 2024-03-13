import { Expose } from 'class-transformer';
import { AccountStatus } from 'modules/account/types/account-status.type';
import { CreateAccountInputDto } from './create-account-input.dto';

export class CreateAccountOutputDto extends CreateAccountInputDto {
  @Expose()
  status!: AccountStatus;
}
