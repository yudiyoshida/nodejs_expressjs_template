import request from 'supertest';
import { expect, it } from 'vitest';

export function Auth(app: any, route: string, userToken: string) {
  console.log(userToken); // erro aqui, ta chegando undefined
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
}
