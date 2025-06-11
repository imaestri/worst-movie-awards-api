import request from 'supertest';
import path from 'path';

import app from '../src/app.js';
import { generateTestToken } from './utils/testUtils.js';


const token = generateTestToken();

describe('GET /movies/producers-interval', () => {
  beforeAll(async () => {
    const csvPath = path.resolve('src/data/Movielist.csv');
    await request(app).post('/csv/upload').attach('file', csvPath);
  });

  it('should return the producers interval object', async () => {
    const response = await request(app).get('/movies/producers-interval').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);
  });

  it('should return empty arrays if no movies are imported', async () => {
    const response = await request(app).get('/movies/producers-interval').set('Authorization', `Bearer ${token}`) ;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);
  });
});
