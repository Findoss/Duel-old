/**
 * TODO
 * @param {*}
 * @returns
 */
module.exports.checkAccess = (levels, requiredLevel) =>
  levels.some(level => level === requiredLevel);

/**
 * TODO
 * @param {*}
 * @returns
 */
module.exports.checkStatus = (status, requiredStatus) => status === requiredStatus;
