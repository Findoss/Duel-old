// vendor
var app = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

// del on
const testBoard5 = [
[0, 0, 1, 4, 1, 2],
[0, 1, 3, 3, 4, 4],
[3, 2, 3, 0, 1, 4],
[0, 1, 2, 1, 0, 1],
[1, 4, 4, 2, 1, 4],
[2, 2, 3, 3, 1, 2]]
// del off

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
  DEBUG.server && console.log('[.] user connected')

  socket.on('log', (msg) => {
    DEBUG.client && console.log('[→] log: ' + msg)
  })

  socket.on('game', (cmd, param) => {
    DEBUG.client && console.log('[→] game: ' + cmd)
    DEBUG.server && console.log(param)
    switch (cmd) {
      case 'load':
        DEBUG.server && console.log('[.] load board')
        DEBUG.server && console.log('[←] board')
        io.emit('load', board.loadBoard(testBoard5))
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
                DEBUG.server && console.log('[←] fake swap')
                board.swap(param, board.activeRune)
                io.emit('swap', [param, board.activeRune])
                io.emit('swap', [param, board.activeRune])
              }
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
