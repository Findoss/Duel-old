const config = require('../config');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

/**
 * TODO описание
 * @param {*} id
 * @param {*} key
 * @param {*} secret
 */
const generateToken = async (id, key = uuidv4(), secret = config.JWTKey) => {
  const token = await JSON.stringify(jwt.sign({ id, key }, secret));
  console.log('');
  console.log(`id       ${id}`);
  console.log(`key      ${key}`);
  console.log(`secret   ${secret}`);
  console.log(`token ↓\n${token}`);
};

generateToken(process.argv[2], process.argv[3], process.argv[4]);
