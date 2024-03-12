import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';

const options: ClassTransformOptions = {
  excludeExtraneousValues: true,
};

export function transformDto<T>(dto: ClassConstructor<T>, plain: any): T {
  return plainToClass(dto, plain, options);
}
