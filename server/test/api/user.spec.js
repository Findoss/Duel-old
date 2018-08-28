const config = require('../../config');
const { expect } = require('chai');
const supertest = require('supertest');

const User = require('../../models/user');

const api = supertest(`${config.node.host}:${config.node.port}`);

const dataUsers = require('./data/users.json');
const dataNewUser = require('./data/new_users.json');

describe('Пользователи', () => {
  beforeEach((done) => {
    User.remove({}, () => done());
  });

  it('получить пользователя по id (не найден)', (done) => {
    api.get('/users/5b8419a9b75bb24770068364').expect(404, done);
  });

  it('получить пользователя по id (не корректный id)', (done) => {
    api.get('/users/0000001').expect(400, done);
  });

  it('получить пользователя по id', (done) => {
    User.create(dataUsers[0]).then((newUser) => {
      api.get(`/users/${newUser._id}`).expect(200, done);
    });
  });

  it('получить список пользователей (в базе нет пользователей)', (done) => {
    api.get('/users').expect(404, done);
  });

  it('регистрация пользователя', (done) => {
    api
      .post('/users')
      .send(dataNewUser[2])
      .expect(201, done);
  });

  // todo НЕТ ВАЛИДАЦИИ ТЕСТ ПАДАЕТ #100
  // it('регистрация пользователя (не корректные параметры)', (done) => {
  //   api
  //     .post('/users')
  //     .send(dataNewUser[0])
  //     .expect(400, done);
  // });

  describe('заполняем базу - users.json', () => {
    beforeEach((done) => {
      User.create(dataUsers).then(() => done());
    });

    it('регистрация пользователя (ник или почта уже занят)', (done) => {
      api
        .post('/users')
        .send(dataNewUser[1])
        .expect(400, done);
    });

    it('получить список пользователей', (done) => {
      api.get('/users').expect(200, done);
    });

    it('получить список пользователей c фильтрами', (done) => {
      api
        .get('/users')
        .query({ skip: 2, limit: 1 })
        .expect((res) => {
          expect(res.body[0].nickname).to.have.string('admin_gold');
        })
        .expect(200, done);
    });

    it('получить список пользователей c фильтрами (не корректный фильтр)', (done) => {
      // игнорируем плохие фильтры и отдаем топ-10
      api
        .get('/users')
        .query({ skip: 'a', limt: 1 })
        .expect(200, done);
    });
  });
});
