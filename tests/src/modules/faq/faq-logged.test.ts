import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

import request from 'supertest';

import app from '../../../../src/app';
import authSetup from '../auth/setup/auth.setup';
import faqSetup from './setup/faq.setup';

const route = '/faqs';
let adminToken: string;
let userToken: string;

beforeAll(async() => {
  await authSetup.dropAdminDatabase();
  await authSetup.dropUserDatabase();
  await authSetup.seedAdminFullAccess();
  await authSetup.seedUserApp();
  adminToken = await authSetup.loginAdmin(app);
  userToken = await authSetup.loginUser(app);
});

beforeEach(async() => {
  await faqSetup.dropFaqDatabase();
});

describe('GET /faqs endpoint', () => {
  it('should return an array (no page, no size)', async() => {
    // arrange

    // act
    const res = await request(app).get(route);

    // assert
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return an array (with page, no size)', async() => {
    // arrange
    const query = { page: 1 };

    // act
    const res = await request(app).get(route).query(query);

    // assert
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return an array (no page, with size)', async() => {
    // arrange
    const query = { size: 10 };

    // act
    const res = await request(app).get(route).query(query);

    // assert
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return pagination data (with page, with size)', async() => {
    // arrange
    const query = { size: 10, page: 1 };

    // act
    const res = await request(app).get(route).query(query);

    // assert
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('totalItems');
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('itemsPerPage');
    expect(res.body).toHaveProperty('page');
  });
});

describe('POST /faqs endpoint', () => {
  it('should return an error when client is not authenticated (401)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(route)
    .send({});

    // assert
    expect(res.status).toBe(401);
  });

  it('should return an error when client does not have permission (403)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(route)
    .set('Authorization', userToken)
    .send({});

    // assert
    expect(res.status).toBe(403);
  });

  it('should return an error when sending empty req.body (400)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(route)
    .set('Authorization', adminToken)
    .send({});

    // assert
    expect(res.status).toBe(400);
  });

  it('should return an error when not sending question field (400)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(route)
    .set('Authorization', adminToken)
    .send({ answer: 'test' });

    // assert
    expect(res.status).toBe(400);
  });

  it('should return an error when not sending answer field (400)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(route)
    .set('Authorization', adminToken)
    .send({ question: 'test' });

    // assert
    expect(res.status).toBe(400);
  });

  it('should create a new faq (201)', async() => {
    // arrange
    const newFaq = { answer: 'test', question: 'test' };

    // act
    await request(app)
    .post(route)
    .set('Authorization', adminToken)
    .send(newFaq)
    .expect(201);

    // assert
    const res = await request(app).get(route);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toContain(newFaq);
  });
});

describe('GET /faqs/id endpoint', () => {
  it('should return an error when client is not authenticated (401)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(`${route}/1`)
    .send({});

    // assert
    expect(res.status).toBe(401);
  });

  it('should return an error when client does not have permission (403)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(`${route}/1`)
    .set('Authorization', userToken)
    .send({});

    // assert
    expect(res.status).toBe(403);
  });

  it('should return an 404 error', async() => {
    const res = await request(app)
    .get(`${route}/1`)
    .set('Authorization', adminToken);

    expect(res.status).toBe(404);
  });

  it('should return a faq', async() => {
    const FaqDto = { answer: 'test', question: 'test' };
    const newFaq = await faqSetup.createFaq(FaqDto);

    const res = await request(app)
    .get(`${route}/${newFaq.id}`)
    .set('Authorization', adminToken);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(newFaq.id);
    expect(res.body.answer).toBe(newFaq.answer);
    expect(res.body.question).toBe(newFaq.question);
  });
});

describe('DELETE /faqs/id endpoint', async() => {
  it('should return an error when client is not authenticated (401)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(`${route}/1`)
    .send({});

    // assert
    expect(res.status).toBe(401);
  });

  it('should return an error when client does not have permission (403)', async() => {
    // arrange

    // act
    const res = await request(app)
    .post(`${route}/1`)
    .set('Authorization', userToken)
    .send({});

    // assert
    expect(res.status).toBe(403);
  });

  it('should delete only one faq', async() => {
    await faqSetup.createFaqs([
      { answer: '1', question: '1' },
      { answer: '2', question: '2' },
    ]);
    const newFaq = await faqSetup.createFaq(
      { answer: 'test', question: 'test' },
    );

    const faqs = await request(app).get(route);
    expect(faqs.body).toHaveLength(3);

    await request(app)
    .delete(`${route}/${newFaq.id}`)
    .set('Authorization', adminToken);

    const faqAfterDelete = await request(app).get(route);
    expect(faqAfterDelete.body).toHaveLength(2);
  });

  it('should return a 404 error', async() => {
    const res = await request(app)
    .delete(`${route}/1`)
    .set('Authorization', adminToken);

    expect(res.status).toBe(404);
  });
});
