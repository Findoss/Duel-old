const config = require('../../config');
const mocha = require('mocha');
const supertest = require('supertest');
const { expect } = require('chai');

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

  it('получить список пользователей (в базе нет пользователей)', (done) => {
    api.get('/users').expect(404, done);
  });

  it('получить список пользователей', (done) => {
    User.create(dataUsers)
      .then(() => {
        api.get('/users').expect(200, done);
      });
  });

  it('получить пользователя по id', (done) => {
    User.create(dataUsers)
      .then((newUser) => {
        api.get(`/users/${newUser[0]._id}`).expect(200, done);
      });
  });

  it('регистрация пользователя', (done) => {
    api
      .post('/users')
      .send(dataNewUser[2])
      .expect(201, done);
  });

  it('регистрация пользователя (ник или емейл уже занят)', (done) => {
    User.create(dataUsers)
      .then(() => {
        api
          .post('/users')
          .send(dataNewUser[1])
          .expect(400, done);
      });
  });

  // todo НЕТ ВАЛИДАЦИИ ТЕСТ ПАДАЕТ #100
  // it('регистрация пользователя (не корректные параметры)', (done) => {
  //   api
  //     .post('/users')
  //     .send(dataNewUser[0])
  //     .expect(400, done);
  // });
});
