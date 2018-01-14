// vendor
const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http)

// configs
const runes = require('./configs/runes')
const key = 'generationRuneKey'

// classes
const Board = require('../libs/board')
const log = require('../libs/log')

const board = new Board(runes, key)

io.on('connection', (socket) => {
  let userName = socket.id.slice(0, 5)
  log('server', `[.] [${userName}] connected`)

  socket.on('msg', (msg) => {
    log('server', msg)
  })

  socket.on('lobby/ready', () => {
    log('server', `[→] [${userName}] ready`,
                  `[←] [ all ] generation board`)
    io.emit('board/generation', board.generationBoard())
  })

  socket.on('board/swap', (coords) => {
    log('server', `[→] [${userName}] swap`, coords)
    // проверка на правильность хода (дублирование кода)
    board.swap(coords[0], coords[1])
    board.findAllClusters()
    do {
      board.deleteClusters()
      board.drop()
      io.emit('board/refill', board.generationSegment())
    } while (board.findAllClusters().length > 0)
  })

  socket.on('disconnect', () => {
    log('server', `[.] [${userName}] disconnected`)
  })
})

http.listen(8080, () => {
  log('server', 'listening on localhost:8080')
})
