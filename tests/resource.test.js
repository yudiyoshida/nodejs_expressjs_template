import request from 'supertest';

import app from '../src/app';
import DataSource from '../src/database/data-source';

// Hooks:
// beforeAll(async () => {})
// beforeEach(async () => {})
// afterAll(async () => {})
// afterEach(async () => {})

beforeAll(async () => {
  // Start database connection.
  await DataSource.$connect();
});

afterAll(async () => {
  // Destroy database connection.
  await DataSource.$disconnect();
});

describe('Grouping tests together', () => {
  test('OK', async () => {
    let result = await request(app).get('/resources');
    expect(result.status).toBe(200);
  });

  test('Not OK', async () => {
    let result = await request(app).get('/resources');
    expect(result.status).toBe(400);
  });
});
