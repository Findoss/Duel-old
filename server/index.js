// vendor
var app = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

// classes
const Board = require('./classes/board')

const board = new Board(5, 5, 3)

io.on('connection', (socket) => {
  console.log('[server] user connected')

  socket.on('log', (msg) => {
    console.log('[ user ] log: ' + msg)
  })

  socket.on('game', (cmd) => {
    console.log('[ user ] game: ' + cmd)
    switch (cmd) {
      case 'generation':
        console.log('[server] emit generation board')
        io.emit('generation', board.generation())
        break
      default:
        console.log('err')
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(8080, () => {
  console.log('listening on *:8080')
})
