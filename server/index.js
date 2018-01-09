// vendor
const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http)

// configs
const runes = require('./configs/runes')
const key = 'generationRuneKey'

// classes
const Board = require('./classes/board')
const DEBUG = require('./configs/debug')

const board = new Board(runes, key)

console.log('DEBUG.client: ' + DEBUG.client)
console.log('DEBUG.server: ' + DEBUG.server)

io.on('connection', (socket) => {
  let userName = socket.id.slice(0, 5)
  DEBUG.server && console.log('[.] %s connected', userName)

  socket.on = (function (original) {
    return function (args) {
      console.log(arguments[0])
      return original.apply(this, arguments)
    }
  })(socket.on)

  socket.on('msg', (msg) => {
    DEBUG.client && console.log('[→] msg: ' + msg)
  })

  socket.on('lobby/ready', () => {
    DEBUG.server && console.log('[.] generation board')
    DEBUG.server && console.log('[←] new board')
    DEBUG.server && console.log('[←] all suggestion')
    io.emit('generation', board.generationBoard())
    io.emit('suggestion', board.findMoves())
  })

  socket.on('board/pick', (coord) => {
    DEBUG.client && console.log('[→] pick: ' + coord)
    if (board.isActiveRune()) {
      if (!board.isEqualCoords(coord, board.activeRune)) {
        if (board.isAdjacent(coord, board.activeRune)) {
          board.swap(coord, board.activeRune)
          board.findClusters(coord)
          board.findClusters(board.activeRune)
          if (board.isClusters()) {
            DEBUG.server && console.log('[←] swap')
            DEBUG.server && console.log('[←] deactive rune')
            io.emit('swap', [coord, board.activeRune])
            io.emit('deactive', board.deActiveRune())
            do {
              DEBUG.server && console.log('[←] delete rune clusters')
              DEBUG.server && console.log('[←] drop runes')
              DEBUG.server && console.log('[←] refill runes')
              io.emit('deleteRunes', board.deleteClusters())
              io.emit('drop', board.drop())
              io.emit('refill', board.refill())
              board.findAllClusters()
            } while (board.isClusters())
          } else {
            board.swap(coord, board.activeRune)
            DEBUG.server && console.log('[←] fake swap')
            io.emit('swap', [coord, board.activeRune])
            io.emit('swap', [coord, board.activeRune])
          }
          DEBUG.server && console.log('[←] all suggestion')
          io.emit('suggestion', board.findMoves())
        } else {
          DEBUG.server && console.log('[←] deactive rune')
          DEBUG.server && console.log('[←] pick new active rune')
          io.emit('deactive', board.deActiveRune())
          io.emit('active', board.pickActiveRune(coord))
        }
      } else {
        DEBUG.server && console.log('[←] deactive rune')
        io.emit('deactive', board.deActiveRune())
      }
    } else {
      DEBUG.server && console.log('[←] pick active rune')
      io.emit('active', board.pickActiveRune(coord))
    }
  })

  socket.on('disconnect', () => {
    console.log(socket)
    DEBUG.server && console.log('[.] user disconnected')
  })
})

http.listen(8080, () => {
  DEBUG.server && console.log('listening on localhost:8080')
})
