import request from 'supertest';
import apiService, { server } from '../../src/index';

afterAll(() => {
  server.close();
});

describe('IT | Courses', () => {
  describe('GET /courses', () => {
    it('should return a list of courses', async () => {

      const response = await request(apiService).get('/courses');

      expect(response.status).toBe(501);
      expect(response.body).toEqual({ message: 'Method not implemented' });
    });
  });
});