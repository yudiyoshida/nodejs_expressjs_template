import request from 'supertest';

import app from '../../../src/app';
import SetupDatabase from '../../fixtures/setup';

// Test flow:
// - GET /texts (400, type required)
// - GET /texts?type=abc (400, invalid type)
// - GET /texts?type=about (200)
// - UPDATE /texts (401)
// - UPDATE /texts (403)
// - UPDATE /texts (400, type required)
// - UPDATE /texts?type=abc (400, invalid type)
// - UPDATE /texts?type=about (400, type required)
// - GET /texts?type=about (200)
// - GET /texts?type=terms (200)
// - GET /texts?type=privacy (200)

beforeAll(async() => {
  await SetupDatabase.dropDatabase();
  await SetupDatabase.seedAdminFullAccess();
  await SetupDatabase.seedUserApp();
  await SetupDatabase.seedTexts();
  await SetupDatabase.loginAdmin(app);
  await SetupDatabase.loginUser(app);
});

describe('READ (GET /texts)', () => {
  test('without query.type (400)', async() => {
    const result = await request(app).get('/texts');
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('type é um campo obrigatório.');
  });

  test('invalid query.type (400)', async() => {
    const result = await request(app).get('/texts?type=abc');
    expect(result.status).toBe(400);
    expect(result.body.error).toMatch(/type inválido/);
  });

  test('valid query.type (200)', async() => {
    const result = await request(app).get('/texts?type=about');
    expect(result.status).toBe(200);
    expect(result.body.type).toBe('about');
    expect(result.body.content).toBe('about vindo da API. Rota integrada.');
  });
});

describe('UPDATE (PUT /texts)', () => {
  test('no authenticated (401)', async() => {
    const result = await request(app)
      .put('/texts')
      .send();

    expect(result.status).toBe(401);
    expect(result.body.error).toBe('Você precisa estar autenticado para prosseguir.');
  });

  test('no authorized (403)', async() => {
    const result = await request(app)
      .put('/texts')
      .set('Authorization', `Bearer ${ SetupDatabase.userToken }`)
      .send();

    expect(result.status).toBe(403);
    expect(result.body.error).toBe('Sem permissão para acessar esse recurso.');
  });

  test('without query.type (400)', async() => {
    const result = await request(app)
      .put('/texts')
      .set('Authorization', `Bearer ${ SetupDatabase.adminToken }`)
      .send();

    expect(result.status).toBe(400);
    expect(result.body.error).toBe('type é um campo obrigatório.');
  });

  test('invalid query.type (400)', async() => {
    const result = await request(app)
      .put('/texts?type=abc')
      .set('Authorization', `Bearer ${ SetupDatabase.adminToken }`)
      .send();

    expect(result.status).toBe(400);
    expect(result.body.error).toMatch(/type inválido/);
  });

  test('update text (200)', async() => {
    const result = await request(app)
      .put('/texts?type=about')
      .set('Authorization', `Bearer ${ SetupDatabase.adminToken }`)
      .send({ 'content': 'about editado.' });

    expect(result.status).toBe(200);
    expect(result.body.type).toBe('about');
    expect(result.body.content).toBe('about editado.');
  });
});

describe('READ again (GET /texts)', () => {
  test('it should return the about text', async() => {
    const result = await request(app).get('/texts?type=about');
    expect(result.status).toBe(200);
    expect(result.body.type).toBe('about');
    expect(result.body.content).toBe('about editado.');
  });

  test('making sure others texts were not changed (terms)', async() => {
    const result = await request(app).get('/texts?type=terms');
    expect(result.status).toBe(200);
    expect(result.body.type).toBe('terms');
    expect(result.body.content).toBe('terms vindo da API. Rota integrada.');
  });

  test('making sure others texts were not changed (privacy)', async() => {
    const result = await request(app).get('/texts?type=privacy');
    expect(result.status).toBe(200);
    expect(result.body.type).toBe('privacy');
    expect(result.body.content).toBe('privacy vindo da API. Rota integrada.');
  });
});
