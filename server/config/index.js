/*
 * eslint no-console: 0
 * правило отключено потому что
 * это важыный элемент логов, управляется через переменную окружения
 */

const mode = process.env.MODE || 'develop';
console.log(`[mode    ] ${mode}`);
module.exports = require(`./${mode}.js`); // eslint-disable-line
