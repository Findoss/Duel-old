var app = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

var Board = require('./classes/board.js')

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('log', (msg) => {
    console.log('log: ' + msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(8080, () => {
  console.log('listening on *:8080')
})
