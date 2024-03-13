import { AppException } from 'errors/app-exception';
import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { LoginDto } from './login.dto';

describe('LoginDto', () => {
  describe('credential field', () => {
    it('should throw an error when no providing any value to credential', async() => {
      const data = {};

      expect.assertions(3);
      return validateAndTransformDto(LoginDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential é um campo obrigatório.');
      });
    });
  });
});
