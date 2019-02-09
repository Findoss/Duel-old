/**
 * TODO описание
 * @param {*}
 * @returns
 */
module.exports.checkAccess = (levels, requiredLevel) =>
  levels.some(level => level === requiredLevel);
