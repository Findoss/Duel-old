const createApp = require('../../index');
const mongoose = require('mongoose');

let api = {};

describe('API TESTS', () => {
  before(async () => {
    api = await createApp();
  });

  require('./me.spec');
  require('./user.spec');
  require('./skills.spec');
  require('./session.spec');

  after(async () => {
    await mongoose.connection.close();
    await api.close();
  });
});
