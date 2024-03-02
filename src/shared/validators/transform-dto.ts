import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';

const options: ClassTransformOptions = {
  excludeExtraneousValues: true,
};

export function transformDto(dto: ClassConstructor<any>, plain: any) {
  return plainToClass(dto, plain, options);
}
