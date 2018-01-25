const debug = require('./debug');

/**
 * выводит лог в консоль
 * @param   {String} tag  Тег для фильтрации
 * @param   {...Any} data Данные для вывода
 * @example
 * log('server',
 *     '[.] generation board',
 *     '[←] new board',
 *     '[←] all suggestion')
 *
 * log('client', `[→] msg: ${msg}\)
 */
module.exports = function log(tag, ...data) {
  if (debug[tag]) {
    if (data.length > 1) console.groupCollapsed();
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
    }
    if (data.length > 1) console.groupEnd();
  }
};
