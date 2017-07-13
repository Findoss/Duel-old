const texturePath = './images/'

const textureRune = {
  fileName: 'rune_',
  size: {
    width: 100,
    height: 100
  },
  animations: {
    wait: [0, 1, 2, 3],
    focus: [4],
    pick: [5, 6, 7],
    destroy: [8, 9, 10, 11]
  },
  events: {
    onInputDown: 'runeClick',
    onInputOver: 'runeOver',
    onInputOut: 'runeOut'
  }
}
