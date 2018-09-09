const config = require('../../config');
const supertest = require('supertest');
const helpers = require('./helpers');

const api = supertest(`${config.node.host}:${config.node.port}`);

// fake data
const dataSkills = require('./data/skills.json');

describe('SKILLS API', () => {
  after(() => console.log());

  beforeEach(async () => {
    await helpers.clearSkills();
  });

  it('получить информацию о всех умениях (в базе нет умений)', async () => {
    await api
      .get('/skills')
      .expect(404);
  });

  it('получить информацию о умении по id', async () => {
    const newSkill = await helpers.loadSkills(dataSkills[0]);
    await api
      .get(`/skills/${newSkill._id}`)
      .expect(200);
  });

  describe('заполняем базу - skills.json', () => {
    beforeEach(async () => {
      await helpers.loadSkills(dataSkills);
    });

    it('получить информацию о всех умениях', async () => {
      await api
        .get('/skills')
        .expect(200);
    });

    it('получить информацию о умении по id (не найден)', async () => {
      await api
        .get('/skills/5b955314977bd66e0b6a8768')
        .expect(404);
    });

    it('получить информацию о умении по id (не корректный id)', async () => {
      await api
        .get('/skills/incorect_id')
        .expect(400);
    });
  });
});
