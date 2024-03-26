import { AppException } from 'errors/app-exception';
import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { LoginInputDto } from './login.dto';

describe('LoginInputDto', () => {
  describe('credential field', () => {
    it('should throw an error when not providing any value to credential', async() => {
      const data = {};

      expect.assertions(3);
      return validateAndTransformDto(LoginInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('credential é um campo obrigatório.');
      });
    });
  });
});
