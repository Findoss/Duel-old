const config = require('../../config');
const { expect } = require('chai');
const supertest = require('supertest');
const helpers = require('../helpers');

const api = supertest(`${config.node.host}:${config.node.port}`);

// fake data
const dataUsers = require('./data/users.json');
const dataSkills = require('./data/skills.json');

describe('ME API', () => {
  after(() => console.log());

  beforeEach(async () => {
    await helpers.loadUsers(dataUsers);
  });

  afterEach(async () => {
    await helpers.clearUsers();
    await helpers.clearSkills();
    await helpers.clearSessions();
  });

  describe('выполняем вход - user 0', () => {
    let token = '';

    beforeEach(async () => {
      token = await helpers.signigUser(0);
    });

    it('получение информации о своем аккаунте', async () => {
      await api
        .get('/me')
        .set('Authorization', token)
        .expect((res) => {
          expect(res.body.nickname).to.equal('NICKNAME_USER_1');
        })
        .expect(200);
    });

    it('удаление своего аккаунта', async () => {
      await api
        .delete('/me')
        .set('Authorization', token)
        .expect((res) => {
          expect(res.body.message).to.equal('Your accaunt is successfully deleted');
        })
        .expect(200);
    });

    it('изменение аватара', async () => {
      await api
        .patch('/me/avatar')
        .set('Authorization', token)
        .send({ avatar: 'shooter_1' })
        .expect((res) => {
          expect(res.body.message).to.equal('Your avatar is updated successfully');
        })
        .expect(200);
    });

    it('изменение аватара (не верный id аватара)', async () => {
      await api
        .patch('/me/avatar')
        .set('Authorization', token)
        .send({ avatar: 'INCORRECT_ID' })
        .expect(400);
    });

    it('изменение никнейма', async () => {
      await api
        .patch('/me/nickname')
        .set('Authorization', token)
        .send({ nickname: 'NEW_NICKNAME_USER' })
        .expect(200);
    });

    it('изменение никнейма (никнейм занят)', async () => {
      await api
        .patch('/me/nickname')
        .set('Authorization', token)
        .send({ nickname: 'NICKNAME_USER_2' })
        .expect(400);
    });

    it('изменение пароля', async () => {
      await api
        .patch('/me/password')
        .set('Authorization', token)
        .send({
          oldPassword: dataUsers[0].password,
          newPassword: 'NEW_PASSWORD_USER',
        })
        .expect(200);
    });

    it('изменение пароля (неверный старый пароль)', async () => {
      await api
        .patch('/me/password')
        .set('Authorization', token)
        .send({
          oldPassword: 'INVALID_PASSWORD',
          newPassword: 'NEW_PASSWORD_USER',
        })
        .expect(403);
    });

    it('покупка умения', async () => {
      const { id } = await helpers.loadSkills(dataSkills[0]);

      await api
        .post('/me/buyskill')
        .set('Authorization', token)
        .send({ id })
        .expect(200);
    });

    it('покупка умения (не достаточный уровень, надо 60)', async () => {
      const { id } = await helpers.loadSkills(dataSkills[2]);

      await api
        .post('/me/buyskill')
        .set('Authorization', token)
        .send({ id })
        .expect(400);
    });

    it('покупка умения (не достаточно денег, надо 3000)', async () => {
      const { id } = await helpers.loadSkills(dataSkills[1]);

      await api
        .post('/me/buyskill')
        .set('Authorization', token)
        .send({ id })
        .expect(400);
    });

    it('добавление умения в набор умений', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(200);
    });

    it('добавление умения в набор умений (несколько одинаковых)', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(200);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(200);
    });

    it('добавление умения в набор умений (не достаточно очков)', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[3].id })
        .expect(400);
    });

    it('добавление умения в набор умений (умение не куплено)', async () => {
      const skills = await helpers.loadSkills(dataSkills);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[1].id })
        .expect(400);
    });

    it('добавление умения в набор умений (не достаточно слотов)', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);
      await helpers.addSkillSet(0, [
        skills[0],
        skills[0],
        skills[0],
        skills[0],
        skills[0],
        skills[0],
        skills[0],
      ]);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[4].id })
        .expect(400);
    });


    it('добавление умения в набор умений (лимит копий исчерпан)', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);
      await helpers.addSkillSet(0, [skills[0], skills[0]]);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(400);
    });

    it('удаление умения из набора умений (умение не в наборе)', async () => {
      const skills = await helpers.loadSkills(dataSkills);

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[2].id })
        .expect(400);
    });

    it('удаление одинаковых умений из набора умений', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);
      await helpers.addSkillSet(0, [skills[0], skills[0], skills[0]]);

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(200);

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(200);
    });

    it('удаление умения из набора умений', async () => {
      const skills = await helpers.loadSkills(dataSkills);
      await helpers.buySkills(0, skills);
      await helpers.addSkillSet(0, skills);

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: skills[0].id })
        .expect(200);
    });
  });
});
