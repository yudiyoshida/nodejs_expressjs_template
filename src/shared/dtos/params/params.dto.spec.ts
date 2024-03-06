import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { ParamsDto } from './params.dto';

describe('ParamsDto', () => {
  describe('id field', () => {
    it('should throw an error about required field when not providing any id', async() => {
      const data = {};

      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to id', async() => {
      const data = { id: null };

      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing empty spaces to id', async() => {
      const data = { id: '  ' };

      expect.assertions(1);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).toContain('id é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to id', async() => {
      const data = { id: 123 };

      expect.assertions(2);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).not.toContain('id é um campo obrigatório.');
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to id', async() => {
      const data = { id: true };

      expect.assertions(2);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).not.toContain('id é um campo obrigatório.');
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to id', async() => {
      const data = { id: {} };

      expect.assertions(2);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).not.toContain('id é um campo obrigatório.');
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to id', async() => {
      const data = { id: [] };

      expect.assertions(2);
      return validateAndTransformDto(ParamsDto, data).catch(err => {
        expect(err.error).not.toContain('id é um campo obrigatório.');
        expect(err.error).toContain('id deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to id', async() => {
      const data = { id: ' foo ' };

      const result = await validateAndTransformDto(ParamsDto, data);

      expect(result).toHaveProperty('id', data.id.trim());
    });
  });
});
