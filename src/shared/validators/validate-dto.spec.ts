import { IsEmail, IsStrongPassword } from 'class-validator';
import { validateDto } from './validate-dto';

class SignupTest {
  nickname!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}

describe('validateDto', () => {
  it('should return an array of errors', () => {
    const signup = new SignupTest();
    signup.email = 'invalid@@email.com',
    signup.password = 'qwerty';

    const result = validateDto(signup);

    expect(result.length).toBeGreaterThan(0);
  });

  it('should remove fields that do not have decorators', () => {
    const signup = new SignupTest();
    signup.email = 'valid@email.com',
    signup.password = '1XVjQupy2_sBtK';
    signup.nickname = (true as unknown as string);

    const result = validateDto(signup);

    expect(result).toHaveLength(0);
  });
});
