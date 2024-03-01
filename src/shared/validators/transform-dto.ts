import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';

const options: ClassTransformOptions = {
  enableImplicitConversion: true,
  excludeExtraneousValues: true,
};

export function transformDto(dto: ClassConstructor<any>, plain: any) {
  return plainToClass(dto, plain, options);
}
