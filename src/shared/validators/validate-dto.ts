import { ValidatorOptions, validateSync } from 'class-validator';

const options: ValidatorOptions = {
  whitelist: true,
};

export function validateDto(dto: any): string[] {
  let messages: string[] = [];

  validateSync(dto, options).forEach((error) => {
    messages = messages.concat(Object.values(error.constraints ?? []));
  });

  return messages;
}
