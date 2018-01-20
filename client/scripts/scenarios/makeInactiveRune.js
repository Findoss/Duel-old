module.exports = world => () => {
  world.activeRune.animations.play('wait', 4, true)
  world.activeRune = null
}
