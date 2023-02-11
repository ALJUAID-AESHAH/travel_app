import request from "supertest";
import app from '../src/server/index'

describe('Test root', () => {
    test('should return a 200 status code', async () => {
        const response = await request(app).get('/').send('dist/index.html')
        expect(response.statusCode).toBe(200);
    });
})