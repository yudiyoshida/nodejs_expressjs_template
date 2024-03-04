import { ClassConstructor } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { RequestPropertyType } from '../types/request-property.type';
import { validateAndTransformDto } from '../validators/validate-transform-dto';

export function ValidateDto(property: RequestPropertyType, dto: ClassConstructor<any>) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      req[property] = await validateAndTransformDto(dto, req.body);

      await originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
