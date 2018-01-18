module.exports = world => (rune) => {
  world.activeRune = rune
  world.activeRune.animations.play('pick', 4, true)
}
