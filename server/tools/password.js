const crypto = require('crypto');

/**
 * TODO описание
 * @param {*} password
 */
const generatePassword = (password = 'qwer123') => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 128, 64, 'sha256').toString('hex');

  console.log('');
  console.log('password');
  console.log(`salt  ${salt}`);
  console.log(`hash  ${hash}`);
};

generatePassword(process.argv[2]);
