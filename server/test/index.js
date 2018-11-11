const createApp = require('./../index');
const mongoose = require('mongoose');

let api = {};

describe('TESTS', () => {
  before(async () => {
    api = await createApp();
  });

  after(async () => {
    await mongoose.connection.close();
    await api.http.close();
  });

  // require('./unit/index');
  require('./integration/index');
  // require('./system/index');
});
