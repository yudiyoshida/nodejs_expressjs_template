import { AppException } from 'errors/app-exception';
import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { CreateAccountInputDto } from './create-account.dto';

describe('CreateAccountInputDto', () => {
  describe('name field', () => {
    it('should throw an error when no providing any value to name', async() => {
      const data = {};

      expect.assertions(3);
      return validateAndTransformDto(CreateAccountInputDto, data).catch((err: AppException) => {
        expect(err).toBeInstanceOf(AppException);
        expect(err.status).toBe(400);
        expect(err.error).toContain('name é um campo obrigatório.');
      });
    });
  });
});
