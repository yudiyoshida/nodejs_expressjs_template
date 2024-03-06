import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'shared/validators/decorators/trim';

export class ParamsDto {
  @Expose()
  @IsString({
    message: 'id deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'id é um campo obrigatório.',
  })
  @Trim()
  id!: string;
}
