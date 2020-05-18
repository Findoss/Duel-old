const config = require('../../config');
const supertest = require('supertest');
const helpers = require('../helpers');

const { it } = helpers;

const api = supertest(`${config.node.host}:${config.node.port}/api`);

// fake data
const EJSON_SKILLS = '../database/data/skills.json';

describe('SKILLS API', () => {
  beforeEach(async () => {
    await helpers.clearSkills();
  });

  it('получить информацию о всех умениях (в базе нет умений)', async () => {
    await api
      .get('/skills')
      .expect(404);
  });

  describe(`заполняем базу - ${EJSON_SKILLS}`, () => {
    beforeEach(async () => {
      await helpers.loadCollection('skills', EJSON_SKILLS);
    });

    it('получить информацию о всех умениях', async () => {
      await api
        .get('/skills')
        .expect(200);
    });

    it('получить информацию о умении по id', async () => {
      await api
        .get('/skills/5b955314977bd66e0b6a8768')
        .expect(200);
    });

    it('получить информацию о умении по id (не найден)', async () => {
      await api
        .get('/skills/5b955314977bd66e0b6a8765')
        .expect(404);
    });

    it('получить информацию о умении по id (не корректный id)', async () => {
      await api
        .get('/skills/incorect_id')
        .expect(400);
    });
  });

  after(() => console.log());
});
