import { IsEmail, IsStrongPassword } from 'class-validator';
import { validateDto } from './validate-dto';

class SigninTest {
  nickname!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

describe('validateDto', () => {
  it('should return an array of errors', async() => {
    const signin = new SigninTest();
    signin.email = 'invalid@@email.com',
    signin.password = 'qwerty';

    const result = await validateDto(signin);

    expect(result.length).toBeGreaterThan(0);
  });

  it('should remove fields that do not have decorators', async() => {
    const signin = new SigninTest();
    signin.email = 'valid@email.com',
    signin.password = '1XVjQupy2_sBtK';
    signin.nickname = (true as unknown as string); // wrong data.

    const result = await validateDto(signin);

    expect(result).toHaveLength(0);
  });
});
