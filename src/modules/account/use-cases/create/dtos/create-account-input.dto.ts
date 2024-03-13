import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Trim } from 'shared/validators/decorators/trim';

export class CreateAccountInputDto {
  @Expose()
  @IsString({
    message: 'name deve ser do tipo string',
  })
  @IsNotEmpty({
    message: 'name é um campo obrigatório',
  })
  @Trim()
  name!: string;

  @Expose()
  @IsString({
    message: 'email deve ser do tipo string',
  })
  @IsNotEmpty({
    message: 'email é um campo obrigatório',
  })
  @IsEmail({}, {
    message: 'E-mail inválido',
  })
  @Trim()
  email!: string;

  @Expose()
  @IsString({
    message: 'password deve ser do tipo string',
  })
  @IsNotEmpty({
    message: 'password é um campo obrigatório',
  })
  @MinLength(8, {
    message: 'A sua senha deve conter, no mínimo, 8 caracteres.',
  })
  password!: string;
}
