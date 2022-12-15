import request from 'supertest';

import app from '../../../src/app';
import SetupDatabase from '../../fixtures/setup';
import sendEmailInputs from './data/send-email';

// Test flow:
// - POST /contact (400, lots of scenarios)
// - POST /contact (200)

beforeAll(async() => {
  await SetupDatabase.dropDatabase();
});

describe('SEND EMAIL (POST /contact)', () => {
  test.each(sendEmailInputs)(
    '$testName',
    async(key) => {
      const result = await request(app)
        .post('/contact')
        .send(key.request.body);

      expect(result.status).toBe(key.response.status);
      expect(result.body.error).toBe(key.response.message);
    },
  );

  test('it should send the email (200)', async() => {
    const result = await request(app)
      .post('/contact')
      .send({
        'name': 'Nome teste',
        'email': 'email@teste.com',
        'message': 'Mensagem teste',
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Mensagem enviada com sucesso! Em breve entraremos em contato.');
  });
});
