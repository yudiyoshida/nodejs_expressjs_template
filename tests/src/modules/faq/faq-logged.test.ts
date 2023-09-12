import request from 'supertest';
import { Prisma } from '@prisma/client';

import app from '../../../../src/app';
import authSetup from '../auth/setup/auth.setup';
import faqSetup from './setup/faq.setup';

let token: string;

beforeAll(async() => {
  await authSetup.dropAdminDatabase();
  await authSetup.seedAdminFullAccess();
  token = await authSetup.loginAdmin(app);
});

describe('GET /faqs endpoint', () => {
  const route = '/faqs';

  test('it should return an empty array', async() => {
    // -- arrange --
    await faqSetup.dropFaqDatabase();

    // -- act --
    const result = await request(app).get(route);

    // -- assert --
    expect(result.body).toHaveProperty('data', []);
    expect(result.body).toHaveProperty('totalItems', 0);
    expect(result.body).toHaveProperty('totalPages', 0);
    expect(result.body).toHaveProperty('itemsPerPage', 10);
    expect(result.body).toHaveProperty('page', 1);
  });

  test('it should return 1 faq', async() => {
    // -- arrange --
    const faqs: Prisma.FaqCreateInput[] = [
      { question: 'Pergunta 01', answer: 'Resposta 01' },
    ];
    await faqSetup.createFaqs(faqs);

    // -- act --
    const result = await request(app).get(route);

    // -- assert --
    expect(result.body.data[0].question).toBe(faqs[0].question);
    expect(result.body.data[0].answer).toBe(faqs[0].answer);
    expect(result.body).toHaveProperty('totalItems', 1);
    expect(result.body).toHaveProperty('totalPages', 1);
    expect(result.body).toHaveProperty('itemsPerPage', 10);
    expect(result.body).toHaveProperty('page', 1);
  });
});

describe.only('POST /faqs endpoint', () => {
  const route = '/faqs';

  test('sending empty req.body and should return an error (400)', async() => {
    // -- arrange --
    await faqSetup.dropFaqDatabase();

    // -- act --
    const result = await request(app)
    .post(route)
    .set('Authorization', `Bearer ${token}`)
    .send({});

    // -- assert --
    expect(result.status).toBe(400);
  });
});
