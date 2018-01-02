// vendor
var app = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

const testBoard5 = [
[1, 1, 2, 5, 2, 3],
[1, 2, 4, 4, 5, 5],
[4, 3, 4, 1, 2, 5],
[1, 2, 3, 2, 1, 2],
[2, 5, 5, 3, 2, 5],
[3, 3, 4, 4, 2, 3]]

// configs
const runes = require('./configs/runes')

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
    DEBUG.server && console.log('[-] agrs: ' + param)
    switch (cmd) {
      case 'load':
        DEBUG.server && console.log('[.] load board')
        DEBUG.server && console.log('[←] board')
        io.emit('load', board.loadBoard(testBoard5))
        break
      case 'todo':
        // todo
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
