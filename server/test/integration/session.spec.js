const config = require('../../config');
const { expect } = require('chai');
const supertest = require('supertest');
const helpers = require('../helpers');

const api = supertest(`${config.node.host}:${config.node.port}/api`);

// fake data
const EJSON_USERS = '../database/data/users.json';
const EJSON_SESSIONS = '../database/data/sessions.json';

const dataUsers = require('./data/users.json');
const { token } = require('./data/current_user.json');

describe('AUTHORIZATION API', () => {
  beforeEach(async () => helpers.loadCollection('users', EJSON_USERS));

  afterEach(async () => {
    await helpers.clearUsers();
    await helpers.clearSessions();
  });

  it('зайти через почту и пароль', async () => {
    await api
      .post('/auth/signin')
      .send({
        email: dataUsers[0].email,
        password: dataUsers[0].password,
      })
      .expect((res) => {
        expect(res.body.token).to.be.a('string');
      })
      .expect(200);
  });

  it('зайти через почту и пароль (не верный логин или пароль)', async () => {
    await api
      .post('/auth/signin')
      .send({
        email: dataUsers[1].email,
        password: dataUsers[1].password,
      })
      .expect(403);
  });

  it('получить доступ к приватным данным (не было входа)', async () => {
    await api
      .get('/tools/checkToken')
      .expect(403);
  });

  it('получить доступ к приватным данным (не валидный токен)', async () => {
    await api
      .get('/tools/checkToken')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNmM4OWU1YjY2ODRlNTFmNDYyYTIzZCIsIm5pY2tuYW1lIjoiSXZhbjIiLCJpYXQiOjE1MzQzMDQ5NjJ9.mkYD3slMipSnftbXvYwtiS1UZsIWFWT55mNOBnxqJhw',
      )
      .expect(403);
  });

  it('получить доступ к приватным данным (не актуальный токен)', async () => {
    await api
      .get('/tools/checkToken')
      .expect(403);
  });

  it('выйти с аккаунта (не было входа)', async () => {
    await api
      .delete('/auth/signout')
      .expect(403);
  });

  describe(`выполняем вход - ${EJSON_SESSIONS}`, async () => {
    beforeEach(async () => helpers.loadCollection('sessions', EJSON_SESSIONS));

    it('выйти с аккаунта', async () => {
      await api
        .delete('/auth/signout')
        .set('Authorization', token)
        .expect(200);
    });

    it('получить доступ к приватным данным', async () => {
      await api
        .get('/tools/checkToken')
        .set('Authorization', token)
        .expect(200);
    });
  });

  after(() => console.log());
});
