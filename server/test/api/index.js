const createApp = require('../../index');
const mongoose = require('mongoose');

let api = {};

describe('API TESTS', () => {
  before(async () => {
    api = await createApp();
  });

  require('./user.spec');
  require('./session.spec');
  require('./skills.spec');

  after(async () => {
    await mongoose.connection.close();
    await api.close();
  });
});
