// /**
//  * TODO описание
//  * @param {*}
//  * @returns
//  */
// module.exports.checkAccess = (levels, requiredLevel) =>
//   levels.some(level => level === requiredLevel);


/**
 * TODO описание
 * @param {*}
 * @returns
 */
module.exports.checkAccess = requiredLevel => (ctx) => {
  // HUCK
  const { store, userId } = ctx;
  const { users } = store;
  const { access } = users[userId];

  if (this.checkAccess(access, requiredLevel)) {
    return true;
  }

  throw Error('Forbidden');
};
