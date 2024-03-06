import { Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { AppException } from 'errors/app-exception';
import { Trim } from './decorators/trim';
import { validateAndTransformDto } from './validate-transform-dto';

class Login {
  @IsEmail()
  @Trim()
  @Expose()
  email!: string;

  @IsStrongPassword()
  @Trim()
  @Expose()
  password!: string;
}

describe('validateAndTransformDto', () => {
  it('should return the data with transformations applied', async() => {
    const validPlainLogin: Login = {
      email: '    valid@email.com    ',
      password: ' TqCmlgtwe1f&Us>    ',
    };

    const result = await validateAndTransformDto(Login, validPlainLogin);

    expect(result.email).toEqualIgnoringWhitespace(validPlainLogin.email);
    expect(result.password).toEqualIgnoringWhitespace(validPlainLogin.password);
  });

  it('should throw an error when providing invalid data', async() => {
    const invalidPlainLogin: Login = {
      email: '    invalid@email.com    ',
      password: ' 12345                ',
    };

    // this line is here because a fulfilled promise won't fail the test.
    expect.assertions(3);

    return validateAndTransformDto(Login, invalidPlainLogin).catch(err => {
      expect(err).toBeInstanceOf(AppException);
      expect(err.status).toBe(400);
      expect(err.error).toBeArray();
    });
  });
});
