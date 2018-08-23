const mocha = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');

const api = supertest('http://localhost:3003');


describe('User', () => {
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
  it('get users', (done) => {
    api.get('/users')
      .expect(200, done);
  });
});
