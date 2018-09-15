const config = require('../config');
const supertest = require('supertest');
const { expect } = require('chai');
const helpers = require('./helpers');

const api = supertest(`${config.node.host}:${config.node.port}`);

// fake data
const dataNewUsers = require('./api/data/new_users.json');

describe('SCENARIOS', () => {
  after(() => console.log());

  afterEach(async () => {
    await helpers.clearUsers();
    await helpers.clearSessions();
  });

  it('регистрация → вход', async () => {
    await api
      .post('/users')
      .send(dataNewUsers[0])
      .expect(201);

    await api
      .post('/auth/signin')
      .send(dataNewUsers[0])
      .expect((res) => {
        expect(res.body.token).to.be.a('string');
      })
      .expect(200);
  });
});
