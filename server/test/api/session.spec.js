const config = require('../../config');
const { expect } = require('chai');
const supertest = require('supertest');
const helpers = require('./helpers');

const api = supertest(`${config.node.host}:${config.node.port}`);

// fake data
const dataNewUser = require('./data/new_users.json');

describe('AUTHORIZATION API', () => {
  after(() => console.log());

  beforeEach(async () => {
    await helpers.clearSessions();
    await helpers.clearUsers();
    await helpers.loadUsers(dataNewUser[1]);
  });

  it('зайти через почту и пароль', async () => {
    await api
      .post('/auth/signin')
      .send(dataNewUser[1])
      .expect((res) => {
        expect(res.body.token).to.be.a('string');
      })
      .expect(200);
  });

  it('зайти через почту и пароль (не верный логин или пароль)', async () => {
    await api
      .post('/auth/signin')
      .send(dataNewUser[2])
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
        'token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNmM4OWU1YjY2ODRlNTFmNDYyYTIzZCIsIm5pY2tuYW1lIjoiSXZhbjIiLCJpYXQiOjE1MzQzMDQ5NjJ9.mkYD3slMipSnftbXvYwtiS1UZsIWFWT55mNOBnxqJhw',
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

  describe('выполняем вход', async () => {
    let token = '';

    beforeEach(async () => {
      token = await helpers.signigFirstUser();
    });

    it('выйти с аккаунта', async () => {
      await api
        .delete('/auth/signout')
        .set('Authorization', `token ${token}`)
        .expect(200);
    });

    it('получить доступ к приватным данным', async () => {
      await api
        .get('/tools/checkToken')
        .set('Authorization', `token ${token}`)
        .expect(200);
    });
  });
});
