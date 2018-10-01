const config = require('../../config');
const { expect } = require('chai');
const supertest = require('supertest');
const helpers = require('../helpers');

const api = supertest(`${config.node.host}:${config.node.port}/api`);

// fake data
const dataUsers = require('./data/users.json');
const { token, userId } = require('./data/current_user.json');

describe('ME API', () => {
  after(() => console.log());

  beforeEach(async () => {
    await helpers.loadCollection('users', '../database/data/users_v1.json');
    await helpers.loadCollection('skills', '../database/data/skills_v1.json');
  });

  afterEach(async () => {
    await helpers.clearUsers();
    await helpers.clearSkills();
    await helpers.clearSessions();
  });

  describe('выполняем вход - #8f3a2', () => {
    beforeEach(async () => {
      await helpers.loadCollection('sessions', '../database/data/sessions_v1.json');
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

    it('покупка умения - #a8768', async () => {
      await api
        .post('/me/buyskill')
        .set('Authorization', token)
        .send({ id: '5b955314977bd66e0b6a8768' })
        .expect(200);
    });

    it('покупка умения - #07741 (не достаточный уровень, надо 60)', async () => {
      await api
        .post('/me/buyskill')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507741' })
        .expect(400);
    });

    it('покупка умения - #07740 (не достаточно денег, надо 3000)', async () => {
      await api
        .post('/me/buyskill')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507740' })
        .expect(400);
    });

    it('добавление умения - #07714 в набор умений', async () => {
      await helpers.buySkills(
        userId,
        '5bae75013dce25479c507714',
      );

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507714' })
        .expect(200);
    });

    it('добавление умения - #07714 в набор умений (несколько одинаковых)', async () => {
      await helpers.buySkills(
        userId,
        '5bae75013dce25479c507714',
      );

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507714' })
        .expect(200);

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507714' })
        .expect(200);
    });

    it('добавление умения - #07741 в набор умений (не достаточно слотов)', async () => {
      await helpers.buySkills(
        userId,
        '5bae75013dce25479c507741',
      );
      await helpers.addSkillSet(
        userId,
        '5bae75013dce25479c507741',
        '5bae75013dce25479c507741',
        '5bae75013dce25479c507741',
      );

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507741' })
        .expect(400);
    });

    it('добавление умения - #07745 в набор умений (не достаточно очков)', async () => {
      await helpers.buySkills(
        userId,
        '5bae75013dce25479c507745',
      );

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507745' })
        .expect(400);
    });

    it('добавление умения - 07740 в набор умений (умение не куплено)', async () => {
      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507740' })
        .expect(400);
    });

    it('добавление умения -#a876f в набор умений (лимит копий исчерпан)', async () => {
      await helpers.buySkills(
        userId,
        '5b955316977bd66e0b6a876f',
      );
      await helpers.addSkillSet(
        userId,
        '5b955316977bd66e0b6a876f',
        '5b955316977bd66e0b6a876f',
      );

      await api
        .post('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5b955316977bd66e0b6a876f' })
        .expect(400);
    });

    it('удаление умения - #a876f из набора умений (умение не в наборе)', async () => {
      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5b955316977bd66e0b6a876f' })
        .expect(400);
    });

    it('удаление одинаковых умений - #07741 из набора умений', async () => {
      await helpers.buySkills(
        userId,
        '5bae75013dce25479c507741',
      );
      await helpers.addSkillSet(
        userId,
        '5bae75013dce25479c507741',
        '5bae75013dce25479c507741',
        '5bae75013dce25479c507741',
      );

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507741' })
        .expect(200);

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507741' })
        .expect(200);
    });

    it('удаление умения из набора умений', async () => {
      await helpers.buySkills(
        userId,
        '5bae75013dce25479c507741',
      );
      await helpers.addSkillSet(
        userId,
        '5bae75013dce25479c507741',
      );

      await api
        .delete('/me/skillset')
        .set('Authorization', token)
        .send({ id: '5bae75013dce25479c507741' })
        .expect(200);
    });
  });
});
