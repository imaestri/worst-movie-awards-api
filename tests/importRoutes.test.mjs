import request from 'supertest';
import path from 'path';
import { fileURLToPath } from 'url';

import app from '../src/app.js';
import { generateTestToken } from './utils/testUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const token = generateTestToken();


describe('POST /csv/upload', () => {
  it('should import movies from CSV and return success message', async () => {
    const csvPath = path.resolve(__dirname, '../src/data/Movielist.csv');
    const response = await request(app)
      .post('/csv/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', csvPath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('total');
    expect(typeof response.body.total).toBe('number');
    expect(response.body.total).toBeGreaterThan(0);
  });

  it('should fail if no file is sent', async () => {
    const response = await request(app)
      .post('/csv/upload')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should fail if file is not a CSV', async () => {
    const fakeFilePath = path.resolve('package.json');
    const response = await request(app)
      .post('/csv/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', fakeFilePath);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});