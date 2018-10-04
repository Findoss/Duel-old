const config = require('../../config');
const { expect } = require('chai');
const supertest = require('supertest');
const helpers = require('../helpers');

const api = supertest(`${config.node.host}:${config.node.port}/api`);

// fake data
const EJSON_USERS = '../database/data/users.json';
const dataNewUser = require('./data/new_users.json');

describe('USER API', () => {
  after(() => console.log());

  afterEach(async () => {
    await helpers.clearUsers();
  });

  it('получить пользователя по id (не найден)', async () => {
    await api
      .get('/users/5b8419a9b75bb24770068364')
      .expect(404);
  });

  it('получить пользователя по id (не корректный id)', async () => {
    await api
      .get('/users/0000001')
      .expect(400);
  });

  it('получить список пользователей (в базе нет пользователей)', async () => {
    await api
      .get('/users')
      .expect(404);
  });

  it('регистрация пользователя', async () => {
    await api
      .post('/users')
      .send(dataNewUser[0])
      .expect((res) => {
        expect(res.body.nickname).to.have.string('NEW_USER_1');
      })
      .expect(201);
  });

  // // todo НЕТ ВАЛИДАЦИИ ТЕСТ ПАДАЕТ #100
  // it('регистрация пользователя (не корректные параметры)', () => {
  //   api
  //     .post('/users')
  //     .send(dataNewUser[0])
  //     .expect(400);
  // });

  describe(`заполняем базу - ${EJSON_USERS}`, async () => {
    beforeEach(async () => {
      await helpers.loadCollection('users', EJSON_USERS);
    });

    it('получить пользователя по id', async () => {
      await api
        .get('/users/5bb230e31ce12b665c48f3a2')
        .expect(200);
    });

    it('регистрация пользователя (ник уже занят)', async () => {
      await api
        .post('/users')
        .send(dataNewUser[1])
        .expect(400);
    });

    it('регистрация пользователя (почта уже занята)', async () => {
      await api
        .post('/users')
        .send(dataNewUser[2])
        .expect(400);
    });

    it('получить список пользователей', async () => {
      await api
        .get('/users')
        .expect(200);
    });

    it('получить список пользователей c фильтрами', async () => {
      await api
        .get('/users')
        .query({ skip: 2, limit: 1 })
        .expect((res) => {
          expect(res.body[0].nickname).to.have.string('NICKNAME_USER_3');
        })
        .expect(200);
    });

    it('получить список пользователей c фильтрами (не корректный фильтр)', async () => {
      // игнорируем плохие фильтры и отдаем топ-10
      await api
        .get('/users')
        .query({ skip: 'a', limt: 'b' })
        .expect(200);
    });
  });
});
