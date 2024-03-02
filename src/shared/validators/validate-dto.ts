import { ValidatorOptions, validate } from 'class-validator';

const options: ValidatorOptions = {
  whitelist: true,
};

export async function validateDto(dto: any): Promise<string[]> {
  let messages: string[] = [];

  (await validate(dto, options)).forEach((error) => {
    messages = messages.concat(Object.values(error.constraints ?? []));
  });

  return messages;
}
