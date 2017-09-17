const testTextureRune = {
  fileName: 'rune_10',
  size: {
    width: 100,
    height: 100
  },
  animations: {
    wait: [3, 4, 5, 6, 7, 8, 9, 10], // getFrameRange(start, end, output)
    focus: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    pick: [1],
    destroy: [0, 2]
  }
}

const testTextureRune2 = {
  fileName: 'rune_20',
  size: {
    width: 100,
    height: 100
  },
  animations: {
    wait: [3, 4, 5, 6, 7, 8, 9, 10], // getFrameRange(start, end, output)
    focus: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
    pick: [1],
    destroy: [0, 2]
  }
}

class Sandbox extends Phaser.State {
  init () {
    this.game.time.advancedTiming = true
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
  }

  preload () {
    this.game.load.spritesheet(testTextureRune.fileName, texturePath + testTextureRune.fileName + '.png', testTextureRune.size.width, testTextureRune.size.height, 34)
  }

  create () {
    let aaa = this.game.add.sprite(140, 20, testTextureRune.fileName)
    for (let animationName in testTextureRune.animations) {
      aaa.animations.add(animationName, testTextureRune.animations[animationName])
    }
    let firstAnimation = Object.keys(testTextureRune.animations)[1]
    aaa.animations.play(firstAnimation, testTextureRune.animations[firstAnimation].length, true)

    let aa = this.game.add.sprite(20, 20, testTextureRune.fileName)
    for (let animationName in testTextureRune.animations) {
      aa.animations.add(animationName, testTextureRune.animations[animationName])
    }
    firstAnimation = Object.keys(testTextureRune.animations)[0]
    aa.animations.play(firstAnimation, testTextureRune.animations[firstAnimation].length, true)

    let a = this.game.add.sprite(20, 140, testTextureRune2.fileName)
    for (let animationName in testTextureRun2.animations) {
      a.animations.add(animationName, testTextureRune2.animations[animationName])
    }
    firstAnimation = Object.keys(testTextureRune2.animations)[1]
    a.animations.play(firstAnimation, testTextureRune2.animations[firstAnimation].length, true)
  }

  update () {

  }

  render () {

  }
}
