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
  DEBUG.server && console.log('[.] ' + socket.id + ' connected')

  socket.on('log', (msg) => {
    DEBUG.client && console.log('[→] log: ' + msg)
  })

  socket.on('game', (cmd, param) => {
    DEBUG.client && console.log('[→] game: ' + cmd)
    DEBUG.server && console.log(param)
    switch (cmd) {
      case 'load':
        // DEBUG.server && console.log('[.] load board')
        // DEBUG.server && console.log('[←] board')
        // io.emit('load', board.loadBoard(testBoard5))
        break
      case 'generation':
        DEBUG.server && console.log('[.] generation board')
        DEBUG.server && console.log('[←] new board')
        DEBUG.server && console.log('[←] all suggestion')
        io.emit('generation', board.generationBoard())
        io.emit('suggestion', board.findMoves())
        break
      case 'pick':
        if (board.isActiveRune()) {
          if (!board.isEqualCoords(param, board.activeRune)) {
            if (board.isAdjacent(param, board.activeRune)) {
              board.swap(param, board.activeRune)
              board.findClusters(param)
              board.findClusters(board.activeRune)
              if (board.isClusters()) {
                DEBUG.server && console.log('[←] swap')
                DEBUG.server && console.log('[←] deactive rune')
                io.emit('swap', [param, board.activeRune])
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
                board.swap(param, board.activeRune)
                DEBUG.server && console.log('[←] fake swap')
                io.emit('swap', [param, board.activeRune])
                io.emit('swap', [param, board.activeRune])
              }
              DEBUG.server && console.log('[←] all suggestion')
              io.emit('suggestion', board.findMoves())
            } else {
              DEBUG.server && console.log('[←] deactive rune')
              DEBUG.server && console.log('[←] pick new active rune')
              io.emit('deactive', board.deActiveRune())
              io.emit('active', board.pickActiveRune(param))
            }
          } else {
            DEBUG.server && console.log('[←] deactive rune')
            io.emit('deactive', board.deActiveRune())
          }
        } else {
          DEBUG.server && console.log('[←] pick active rune')
          io.emit('active', board.pickActiveRune(param))
        }
        break
      default:
        DEBUG.server && console.log('error game command client')
    }
  })

  socket.on('disconnect', () => {
    DEBUG.server && console.log('[.] user disconnected')
  })
})

http.listen(8080, () => {
  DEBUG.server && console.log('listening on localhost:8080')
})
