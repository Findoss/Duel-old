let counter = 0

class Debug {
  constructor (board, view, queue) {
    this.linkBoard = board
    this.linkView = view
    this.linkQueue = queue

    this.linkQueue.onAdd.add((command) => {
      // let style = {font: '25px Arial', fill: '#fffff5'}
      counter++
      // game.add.text(20, (counter * 30) + 850, counter + ' ' + command, style)
      console.log(counter + ' ' + command)
    })
/*
    this.linkBoard.onDrop.add(function (argument) {
      console.log('board.onDrop')
      // console.log(argument)
      this.boardConsole(this.linkBoard.board)
    }, this)

    this.linkQueue.onPlay.add(function (argument) {
      console.log('queue.onPlay')
      console.log(argument.command + ': ' + argument.args)
    }, this)

    this.linkBoard.onLoad.add(function (argument) {
      console.log('board.onLoad')
      console.log(argument)
    }, this)

    this.linkBoard.preSwap.add(function (argument) {
      console.log('board.preSwap')
      console.log(argument)
    }, this)

    this.linkBoard.onSwap.add(function (argument) {
      console.log('board.onSwap')
      console.log(argument)
    }, this)

    this.linkBoard.onFindClusters.add(function (argument) {
      if (argument.length) {
        console.log('board.onFindClusters')
        console.log(argument)
      }
    }, this)

    this.linkBoard.onFindMoves.add(function (argument) {
      console.log('board.onFindMoves')
      console.log(argument)
    }, this)

    this.linkBoard.onDeleteClusters.add(function (argument) {
      console.log('board.onDeleteClusters')
      console.log(argument)
    }, this)
    */
  }

  test (name, savedBoard) {
    console.log(name + ' test = ' + this.comparisonBoards(savedBoard))
  }

  comparisonBoards (savedBoard) {
    for (let i = 0; i < savedBoard.length; i++) {
      for (let j = 0; j < savedBoard[i].length; j++) {
        if (savedBoard[i][j] !== this.linkBoard.board[i][j].type) {
          return false
        }
      }
    }
    return true
  }

  boardConsole (board) {
    for (let i = 0; i < board.length; i++) {
      let tmpStr = ' '
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].type === undefined) {
          tmpStr += board[i][j].key[board[i][j].key.length - 1]
        } else {
          tmpStr += board[i][j].type
        }
        tmpStr += '  '
      }
      console.log('|' + tmpStr + '|\n')
      tmpStr = ''
    }
    console.log('\n')
  }
}

/*
console.table(variableName)
console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
console.info('%c Oh my heavens! ', 'background: #222; color: #bada55');
console.warn('Error: '.red + 'this is an error message');
console.error('%c Oh my heavens! ', 'background: #222; color: #bada55');
*/
