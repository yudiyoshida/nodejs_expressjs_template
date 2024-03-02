import { Expose } from 'class-transformer';
import { transformDto } from './transform-dto';

class UserTest {
  @Expose()
  name!: string;

  @Expose()
  age!: number;
}

const plainUser = {
  name: 'Jhon Doe',
  age: '30',
  nationality: 'japanese',
};

describe('transformDto', () => {
  it('should transform a plain object to a instance of a class', () => {
    const result = transformDto(UserTest, plainUser);

    expect(result).toBeInstanceOf(UserTest);
  });

  it('should not make implicit transformations', () => {
    const result = transformDto(UserTest, plainUser);

    expect(result.name).toBe('Jhon Doe');
    expect(result.age).not.toBe(30);
  });

  it('should remove extra fields', () => {
    const result = transformDto(UserTest, plainUser);

    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('age');
    expect(result).not.toHaveProperty('nationality');
  });
});
