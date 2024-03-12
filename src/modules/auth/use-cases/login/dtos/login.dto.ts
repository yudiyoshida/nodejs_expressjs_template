import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'shared/validators/decorators/trim';

export class LoginDto {
  @Expose()
  @IsString({
    message: 'credential deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'credential é um campo obrigatório.',
  })
  @Trim()
  credential!: string;

  @Expose()
  @IsString({
    message: 'password deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'password é um campo obrigatório.',
  })
  password!: string;
}
