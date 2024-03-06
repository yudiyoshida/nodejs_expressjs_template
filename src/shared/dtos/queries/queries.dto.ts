import { Expose } from 'class-transformer';
import { IsOptional, IsString, Validate } from 'class-validator';
import { IsPositiveIntegerNumber } from 'shared/validators/custom-validators/positive-int-number';
import { StringToNumber } from 'shared/validators/decorators/string-to-number';
import { Trim } from 'shared/validators/decorators/trim';

// TODO: refatorar (agrupar IsPositiveIntegerNumber e StringToNumber)
export class QueriesDto {
  @Expose()
  @IsOptional()
  @Validate(IsPositiveIntegerNumber)
  @StringToNumber()
  page?: number;

  @Expose()
  @IsOptional()
  @Validate(IsPositiveIntegerNumber)
  @StringToNumber()
  size?: number;

  @Expose()
  @IsOptional()
  @IsString({
    message: 'search deve ser do tipo string.',
  })
  @Trim()
  search?: string;
}
