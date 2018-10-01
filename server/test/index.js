const createApp = require('./../index');
const mongoose = require('mongoose');

let api = {};

describe('TESTS', () => {
  before(async () => {
    api = await createApp();
  });

  after(async () => {
    await mongoose.connection.close();
    await api.close();
  });

  require('./api/index');
  // require('./scenarios');
});
