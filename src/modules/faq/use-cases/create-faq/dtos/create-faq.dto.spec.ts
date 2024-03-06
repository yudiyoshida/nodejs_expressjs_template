import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { CreateFaqDto } from './create-faq.dto';

describe('CreateFaqDto', () => {
  describe('question field', () => {
    it('should throw an error about required field when not providing any question', async() => {
      const data = {};

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).toContain('question é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to question', async() => {
      const data = { question: null };

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).toContain('question é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing empty spaces to question', async() => {
      const data = { question: '  ' };

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).toContain('question é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to question', async() => {
      const data = { question: 123 };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('question é um campo obrigatório.');
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to question', async() => {
      const data = { question: true };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('question é um campo obrigatório.');
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to question', async() => {
      const data = { question: {} };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('question é um campo obrigatório.');
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to question', async() => {
      const data = { question: [] };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('question é um campo obrigatório.');
        expect(err.error).toContain('question deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to question', async() => {
      const data = { question: ' foo ' };

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/question/)]));
      });
    });
  });

  describe('answer field', () => {
    it('should throw an error about required field when not providing any answer', async() => {
      const data = {};

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).toContain('answer é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing null to answer', async() => {
      const data = { answer: null };

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).toContain('answer é um campo obrigatório.');
      });
    });

    it('should throw an error about required field when providing empty spaces to answer', async() => {
      const data = { answer: '  ' };

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).toContain('answer é um campo obrigatório.');
      });
    });

    it('should throw an error about invalid type when providing a number to answer', async() => {
      const data = { answer: 123 };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('answer é um campo obrigatório.');
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing a boolean to answer', async() => {
      const data = { answer: true };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('answer é um campo obrigatório.');
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an object to answer', async() => {
      const data = { answer: {} };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('answer é um campo obrigatório.');
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should throw an error about invalid type when providing an array to answer', async() => {
      const data = { answer: [] };

      expect.assertions(2);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toContain('answer é um campo obrigatório.');
        expect(err.error).toContain('answer deve ser do tipo string.');
      });
    });

    it('should not throw an error when providing a string to answer', async() => {
      const data = { answer: ' foo ' };

      expect.assertions(1);
      return validateAndTransformDto(CreateFaqDto, data).catch(err => {
        expect(err.error).not.toEqual(expect.arrayContaining([expect.stringMatching(/answer/)]));
      });
    });
  });

  describe('all fields together', () => {
    it('should pass all tests', async() => {
      const data: CreateFaqDto = { question: ' foo ', answer: ' bar ' };

      const result = await validateAndTransformDto(CreateFaqDto, data);

      expect(result).toHaveProperty('question', data.question.trim());
      expect(result).toHaveProperty('answer', data.answer.trim());
    });
  });
});
