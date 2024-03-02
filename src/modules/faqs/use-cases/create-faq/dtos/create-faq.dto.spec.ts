import { validateAndTransformDto } from 'shared/validators/validate-transform-dto';
import { CreateFaqDto } from './create-faq.dto';

function validate(plain: any) {
  try {
    validateAndTransformDto(CreateFaqDto, plain);
  }
  catch (err: any) {
    return err.error;

  }
}

describe('CreateFaqDto', () => {
  describe('question field', () => {
    it('should throw an error about required field when not providing any question', () => {
      const data = {};

      expect(validate(data)).toContain('question é um campo obrigatório.');
    });

    it('should throw an error about required field when providing null to question', () => {
      const data = { question: null };

      expect(validate(data)).toContain('question é um campo obrigatório.');
    });

    it('should throw an error about required field when providing empty spaces to question', () => {
      const data = { question: '  ' };

      expect(validate(data)).toContain('question é um campo obrigatório.');
    });

    it('should throw an error about invalid type when providing a number to question', () => {
      const data = { question: 123 };

      expect(validate(data)).not.toContain('question é um campo obrigatório.');
      expect(validate(data)).toContain('question deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean to question', () => {
      const data = { question: true };

      expect(validate(data)).not.toContain('question é um campo obrigatório.');
      expect(validate(data)).toContain('question deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing an object to question', () => {
      const data = { question: {} };

      expect(validate(data)).not.toContain('question é um campo obrigatório.');
      expect(validate(data)).toContain('question deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing an array to question', () => {
      const data = { question: [] };

      expect(validate(data)).not.toContain('question é um campo obrigatório.');
      expect(validate(data)).toContain('question deve ser do tipo string.');
    });

    it('should not throw an error when providing a string to question', () => {
      const data = { question: ' foo ' };

      expect(validate(data)).not.toEqual(expect.arrayContaining([expect.stringMatching(/question/)]));
    });
  });

  describe('answer field', () => {
    it('should throw an error about required field when not providing any answer', () => {
      const data = {};

      expect(validate(data)).toContain('answer é um campo obrigatório.');
    });

    it('should throw an error about required field when providing null to answer', () => {
      const data = { answer: null };

      expect(validate(data)).toContain('answer é um campo obrigatório.');
    });

    it('should throw an error about required field when providing empty spaces to answer', () => {
      const data = { answer: '  ' };

      expect(validate(data)).toContain('answer é um campo obrigatório.');
    });

    it('should throw an error about invalid type when providing a number to answer', () => {
      const data = { answer: 123 };

      expect(validate(data)).not.toContain('answer é um campo obrigatório.');
      expect(validate(data)).toContain('answer deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing a boolean to answer', () => {
      const data = { answer: true };

      expect(validate(data)).not.toContain('answer é um campo obrigatório.');
      expect(validate(data)).toContain('answer deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing an object to answer', () => {
      const data = { answer: {} };

      expect(validate(data)).not.toContain('answer é um campo obrigatório.');
      expect(validate(data)).toContain('answer deve ser do tipo string.');
    });

    it('should throw an error about invalid type when providing an array to answer', () => {
      const data = { answer: [] };

      expect(validate(data)).not.toContain('answer é um campo obrigatório.');
      expect(validate(data)).toContain('answer deve ser do tipo string.');
    });

    it('should not throw an error when providing a string to answer', () => {
      const data = { answer: ' foo ' };

      expect(validate(data)).not.toEqual(expect.arrayContaining([expect.stringMatching(/answer/)]));
    });
  });

  describe('all fields together', () => {
    it('should now throw any error when providing only valid values', () => {
      const data = { question: 'foo', answer: 'bar' };

      expect(validate(data)).toBeUndefined();
    });
  });
});
