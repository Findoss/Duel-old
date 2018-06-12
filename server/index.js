console.log("hello");// config
// config
const config = {
  ...require('./config/default.json'),
  ...require('./config/production.json')
};
