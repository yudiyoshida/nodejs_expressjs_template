import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Trim } from 'shared/validators/decorators/trim';

export class CreateFaqDto {
  @IsString({
    message: 'question deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'question é um campo obrigatório',
  })
  @Trim()
  @Expose()
  question!: string;

  @IsString({
    message: 'answer deve ser do tipo string.',
  })
  @IsNotEmpty({
    message: 'answer é um campo obrigatório',
  })
  @Trim()
  @Expose()
  answer!: string;
}
