/**
 * TODO
 * Комментарии
 */
module.exports = world => () => {
  world.activeRune.animations.play('wait', 4, true);
  world.setActiveRune(null);
};
