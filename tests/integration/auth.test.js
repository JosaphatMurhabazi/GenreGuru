const request = require('supertest');
const { User } = require('../../models/user');
const logger = require('../../logger');
const mongoose = require('mongoose');
const { Genre } = require('../../models/genre');
let server;

describe('Auth middleware', () => {
  beforeEach(() => {
    const PORT = 4001;
    server = require('../../app').listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  });

  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  let token;

  const exec = () => {
    return request(server)
      .post('/api/genres')
      .set('cookie', `jwt=${token}`)
      .send({ name: 'Action' });
  };
  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if no token is invalid', async () => {
    token = 'a';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token valid', async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
