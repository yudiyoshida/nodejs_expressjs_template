import AppException from 'errors/app-exception';

import { ClassConstructor } from 'class-transformer';
import { transformDto } from './transform-dto';
import { validateDto } from './validate-dto';

export function validateAndTransformDto(dto: ClassConstructor<any>, plain: any) {
  // create new instance of dto class and copies all values from req.body to instance.
  const dtoInstance = transformDto(dto, plain);

  // validate using class-validator.
  const errors = validateDto(dtoInstance);
  if (errors.length > 0) {
    throw new AppException(400, errors);
  }

  return dtoInstance;
}
