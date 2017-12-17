// vendor
var app = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

// classes
const Board = require('./classes/board')
const DEBUG = require('./configs/debug')

const board = new Board()

console.log('DEBUG.client: ' + DEBUG.client)
console.log('DEBUG.server: ' + DEBUG.server)

io.on('connection', (socket) => {
  DEBUG.server && console.log('[.] user connected')

  socket.on('log', (msg) => {
    DEBUG.client && console.log('[→] log: ' + msg)
  })

  socket.on('game', (cmd) => {
    DEBUG.client && console.log('[→] game: ' + cmd)
    switch (cmd) {
      case 'generation':
        DEBUG.server && console.log('[.] generation board')
        DEBUG.server && console.log('[←] new board')
        io.emit('generation', board.generation())
        break
      default:
        DEBUG.server && console.log('err')
    }
  })

  socket.on('disconnect', () => {
    DEBUG.server && console.log('[.] user disconnected')
})

http.listen(8080, () => {
  DEBUG.server && console.log('listening on localhost:8080')
})
