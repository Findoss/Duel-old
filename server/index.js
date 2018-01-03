// vendor
var app = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

// del on
const testBoard5 = [
[1, 1, 2, 5, 2, 3],
[1, 2, 4, 4, 5, 5],
[4, 3, 4, 1, 2, 5],
[1, 2, 3, 2, 1, 2],
[2, 5, 5, 3, 2, 5],
[3, 3, 4, 4, 2, 3]]
// del off

// configs
const runes = require('./configs/runes')
const key = 'generationRuneKey'

// classes
const Board = require('./classes/board')
const DEBUG = require('./configs/debug')

const board = new Board(runes)

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
        if (board.activeRune !== null) {
          if (!board.isEqualCoords(param, board.activeRune)) {
            if (board.isAdjacent(param, board.activeRune)) {
              board.swap(param, board.activeRune)
              board.findClusters(param)
              board.findClusters(board.activeRune)
              if (board.clusters.length) {
                DEBUG.server && console.log('[←] swap')
                DEBUG.server && console.log('[←] deactive rune')
                DEBUG.server && console.log('[←] delete rune clusters')
                DEBUG.server && console.log('[←] drop runes')
                io.emit('swap', [param, board.activeRune])
                io.emit('deactive', board.deActiveRune())
                io.emit('deleteRunes', board.deleteClusters())
                io.emit('drop', board.drop())
                io.emit('refill', board.refill())
              } else {
                DEBUG.server && console.log('[←] fake swap')
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
