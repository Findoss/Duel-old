const config = require('../../config');
const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    type: 'login',
    user: config.email.username,
    pass: config.email.password,
  },
});
