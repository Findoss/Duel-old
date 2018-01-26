/**
 * TODO
 * Комментарии
 */
module.exports = world => (rune) => {
  world.setActiveRune(rune);
  world.activeRune.animations.play('pick', 4, true);
};
