import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { QueriesDto } from './queries.dto';

describe('QueriesDto', () => {
  describe('page field', () => {
    it('should not throw an error when not providing any page', async() => {
      const data = { size: 'invalid' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });

    it('should not throw an error when providing null to page', async() => {
      const data = { size: 'invalid', page: null };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });

    it('should throw an error about invalid type when providing empty spaces to page', async() => {
      const data = { page: '  ' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a string to page', async() => {
      const data = { page: ' foo ' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to page', async() => {
      const data = { page: true };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an object to page', async() => {
      const data = { page: {} };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an array to page', async() => {
      const data = { page: [] };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing a decimal number to page', async() => {
      const data = { page: 1.4 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing zero to page', async() => {
      const data = { page: 0 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing negative number to page', async() => {
      const data = { page: -1 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('page deve ser um número inteiro positivo.');
      });
    });

    it('should not throw an error when providing a int number to page (string)', async() => {
      const data = { size: 'invalid', page: '399' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });

    it('should not throw an error when providing a int number to page (number)', async() => {
      const data = { size: 'invalid', page: 399 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/page/)]));
      });
    });
  });

  describe('size field', () => {
    it('should not throw an error when not providing any size', async() => {
      const data = { page: 'invalid' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });

    it('should not throw an error when providing null to size', async() => {
      const data = { page: 'invalid', size: null };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });

    it('should throw an error about invalid type when providing empty spaces to size', async() => {
      const data = { size: '  ' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a string to size', async() => {
      const data = { size: ' foo ' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to size', async() => {
      const data = { size: true };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an object to size', async() => {
      const data = { size: {} };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error about invalid type when providing an array to size', async() => {
      const data = { size: [] };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing a decimal number to size', async() => {
      const data = { size: 1.4 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing zero to size', async() => {
      const data = { size: 0 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should throw an error when providing negative number to size', async() => {
      const data = { size: -1 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('size deve ser um número inteiro positivo.');
      });
    });

    it('should not throw an error when providing a int number to size (string)', async() => {
      const data = { page: 'invalid', size: '399' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });

    it('should not throw an error when providing a int number to size (number)', async() => {
      const data = { page: 'invalid', size: 399 };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/size/)]));
      });
    });
  });

  describe('search field', () => {
    it('should not throw an error when not providing any search', async() => {
      const data = { page: 'invalid' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should not throw an error when providing null to search', async() => {
      const data = { page: 'invalid', search: null };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should not throw an error when providing empty spaces to search', async() => {
      const data = { page: 'invalid', search: '  ' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should not throw an error when providing a string to search', async() => {
      const data = { page: 'invalid', search: 'foo' };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/search/)]));
      });
    });

    it('should throw an error about invalid type when providing a boolean to search', async() => {
      const data = { search: true };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('search deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to search', async() => {
      const data = { search: {} };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('search deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to search', async() => {
      const data = { search: [] };

      expect.assertions(1);
      return validateAndTransformDto(QueriesDto, data).catch(err => {
        expect(err.error).toContain('search deve ser do tipo string.');
      });
    });
  });

  describe('all fields together', () => {
    it('should pass all tests and apply transformations', async() => {
      const data = { page: '7', size: '10', search: ' foo bar ' };

      const result = await validateAndTransformDto(QueriesDto, data);

      expect(result).toHaveProperty('page', +data.page);
      expect(result).toHaveProperty('size', +data.size);
      expect(result).toHaveProperty('search', data.search.trim());
    });
  });
});
