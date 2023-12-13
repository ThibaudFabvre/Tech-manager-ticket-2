import request from 'supertest';
import { app } from '.';
import { expect } from 'chai';

describe('ticket GET endpoint', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');

    // Use Chai's expect for assertions
    expect(response.status).to.equal(200);
  });
});