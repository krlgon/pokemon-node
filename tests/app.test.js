const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

jest.mock('../src/db', () => ({
  query: jest.fn()
}));

afterEach(() => {
  jest.clearAllMocks();
});

test('GET /health returns ok', async () => {
  const response = await request(app).get('/health');
  expect(response.status).toBe(200);
  expect(response.body.service).toBe('pokemon-node');
});

test('GET /api/pokemon returns characters', async () => {
  pool.query.mockResolvedValueOnce([[{ id: 1, name: 'Pikachu' }]]);
  const response = await request(app).get('/api/pokemon');
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(1);
});

